// "use client";
// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect, useRef, useCallback } from "react";
// import {
//   Send,
//   ChevronDown,
//   MessageSquare,
//   Loader2,
//   Wifi,
//   WifiOff,
// } from "lucide-react";
// import { RiContactsLine } from "react-icons/ri";
// import Image from "next/image";
// import Link from "next/link";
// import { CiLogin } from "react-icons/ci";
// import { io, Socket } from "socket.io-client";

// // ─── Types ────────────────────────────────────────────────────────────────────

// type MessageSender = "VISITOR" | "ADMIN";

// interface Message {
//   id: string;
//   sender: MessageSender;
//   text: string;
//   createdAt: string;
// }

// interface Conversation {
//   id: string;
//   visitorName: string;
//   visitorEmail: string;
//   status: string;
//   messages: Message[];
// }

// type ChatStep = "info" | "chat";

// // ─── Constants ────────────────────────────────────────────────────────────────

// const BACKEND =
//   process.env.NEXT_PUBLIC_SFJ_BACKEND_URL ?? "http://localhost:8008";
// const SOCKET_URL =
//   process.env.NEXT_PUBLIC_SFJ_BACKEND_URL ?? "http://localhost:8008";

// // Polling is ONLY used when socket is confirmed disconnected.
// // Increase interval since it's a fallback, not the primary mechanism.
// const POLL_INTERVAL_MS = 10000;

// const LABEL_CLASS =
//   "pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-2 " +
//   "whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-medium " +
//   "text-white shadow-lg opacity-0 translate-x-1 transition-all duration-200 " +
//   "group-hover:opacity-100 group-hover:translate-x-0 " +
//   "group-focus-visible:opacity-100 group-focus-visible:translate-x-0";

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// function formatTime(iso: string) {
//   return new Date(iso).toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// function saveSession(data: {
//   conversationId: string;
//   name: string;
//   email: string;
//   phone: string;
// }) {
//   localStorage.setItem("sfj_chat_session", JSON.stringify(data));
// }

// function loadSession(): {
//   conversationId: string;
//   name: string;
//   email: string;
//   phone: string;
// } | null {
//   try {
//     const raw = localStorage.getItem("sfj_chat_session");
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

// function clearSession() {
//   localStorage.removeItem("sfj_chat_session");
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// const SFJContactForm = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [step, setStep] = useState<ChatStep>("info");

//   // Info form fields
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [countryCode, setCountryCode] = useState("+91");
//   const [phone, setPhone] = useState("");
//   const [queryType, setQueryType] = useState("general");
//   const [firstMsg, setFirstMsg] = useState("");
//   const [infoErrors, setInfoErrors] = useState<Record<string, string>>({});
//   const [submitting, setSubmitting] = useState(false);

//   // Chat state
//   const [conversation, setConversation] = useState<Conversation | null>(null);
//   const [replyText, setReplyText] = useState("");
//   const [sendingReply, setSendingReply] = useState(false);
//   const [socketOnline, setSocketOnline] = useState(false); // show Live/Offline indicator

//   const socketRef = useRef<Socket | null>(null);
//   const pollRef = useRef<NodeJS.Timeout | null>(null);
//   const messagesEnd = useRef<HTMLDivElement>(null);

//   // ── Auto-scroll to latest message ───────────────────────────────────────
//   useEffect(() => {
//     messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
//   }, [conversation?.messages]);

//   // ── Restore session on mount ─────────────────────────────────────────────
//   useEffect(() => {
//     const session = loadSession();
//     if (!session) return;
//     setName(session.name);
//     setEmail(session.email);
//     setPhone(session.phone);
//     fetchConversation(session.conversationId).then((conv) => {
//       if (conv) {
//         setConversation(conv);
//         setStep("chat");
//       }
//     });
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   // ─────────────────────────────────────────────────────────────────────────
//   // SOCKET SETUP
//   // Only runs when we have a conversationId (i.e. after the first message).
//   //
//   // Flow:
//   //   1. Socket connects  → join room, stop polling (primary = socket)
//   //   2. Receive update   → setConversation() directly, no extra API call
//   //   3. Socket drops     → start polling as fallback
//   //   4. Socket reconnects→ stop polling, rejoin room
//   // ─────────────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!conversation?.id) return;

//     // Don't create a second socket if one already exists
//     if (socketRef.current) return;

//     const socket = io(SOCKET_URL, {
//       path: "/socket.io",
//       transports: ["websocket", "polling"],
//       reconnectionAttempts: 15,
//       reconnectionDelay: 3000,
//       reconnectionDelayMax: 10000,
//     });
//     socketRef.current = socket;

//     // ── Connected ──────────────────────────────────────────────────────────
//     socket.on("connect", () => {
//       setSocketOnline(true);
//       stopPolling(); // ← socket is up, no polling needed
//       socket.emit("join:conversation", { conversationId: conversation.id });
//       console.log("[socket] connected, joined conv:", conversation.id);
//     });

//     // ── Receive real-time update from backend ──────────────────────────────
//     // The backend emits this whenever admin replies.
//     // We update state directly — zero extra API calls.
//     socket.on("conversation:updated", (updated: Conversation) => {
//       if (updated.id === conversation.id) {
//         setConversation(updated); // ← instant, no polling
//       }
//     });

//     // ── Disconnected → fall back to polling ───────────────────────────────
//     socket.on("disconnect", (reason) => {
//       setSocketOnline(false);
//       console.log("[socket] disconnected:", reason, "— starting poll fallback");
//       startPolling(conversation.id); // ← polling ONLY starts here
//     });

//     // ── Reconnected → stop polling, rejoin room ────────────────────────────
//     socket.on("reconnect", () => {
//       setSocketOnline(true);
//       stopPolling(); // ← socket is back, kill poll
//       socket.emit("join:conversation", { conversationId: conversation.id });
//       console.log("[socket] reconnected, rejoined conv:", conversation.id);
//     });

//     socket.on("connect_error", (err) => {
//       console.warn("[socket] connection error:", err.message);
//     });

//     // Cleanup on unmount or conversation change
//     return () => {
//       socket.off("connect");
//       socket.off("disconnect");
//       socket.off("reconnect");
//       socket.off("connect_error");
//       socket.off("conversation:updated");
//       socket.disconnect();
//       socketRef.current = null;
//       stopPolling();
//     };
//   }, [conversation?.id]); // eslint-disable-line react-hooks/exhaustive-deps

//   // ─────────────────────────────────────────────────────────────────────────
//   // POLLING — only used as a fallback when socket is offline.
//   // Stops itself when socket reconnects (see above).
//   // ─────────────────────────────────────────────────────────────────────────
//   const startPolling = useCallback((convId: string) => {
//     stopPolling(); // clear any existing interval first
//     console.log(
//       "[poll] starting fallback polling every",
//       POLL_INTERVAL_MS,
//       "ms",
//     );
//     pollRef.current = setInterval(async () => {
//       const conv = await fetchConversation(convId);
//       if (conv) setConversation(conv);
//     }, POLL_INTERVAL_MS);
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   const stopPolling = useCallback(() => {
//     if (pollRef.current) {
//       clearInterval(pollRef.current);
//       pollRef.current = null;
//       console.log("[poll] stopped");
//     }
//   }, []);

//   // ── Fetch conversation via REST (used for initial load + poll fallback) ──
//   const fetchConversation = async (
//     id: string,
//   ): Promise<Conversation | null> => {
//     try {
//       const res = await fetch(`${BACKEND}/api/conversations/${id}`);
//       const json = await res.json();
//       return json.success ? json.data : null;
//     } catch {
//       return null;
//     }
//   };

//   // ── Submit info form → create conversation ────────────────────────────────
//   const handleInfoSubmit = async () => {
//     const errors: Record<string, string> = {};
//     if (!name.trim() || name.trim().length < 2) errors.name = "Enter your name";
//     if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
//       errors.email = "Enter a valid email";
//     if (!phone.trim() || !/^\d{10,15}$/.test(phone))
//       errors.phone = "Enter a valid phone number";
//     if (!firstMsg.trim()) errors.firstMsg = "Enter your message";
//     if (Object.keys(errors).length > 0) {
//       setInfoErrors(errors);
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const res = await fetch(`${BACKEND}/api/conversations/message`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: name.trim(),
//           email: email.trim().toLowerCase(),
//           countryCode,
//           phoneNumber: phone.trim(),
//           type: queryType,
//           text: firstMsg.trim(),
//         }),
//       });
//       const json = await res.json();
//       if (!json.success) throw new Error(json.message);

//       saveSession({ conversationId: json.conversationId, name, email, phone });

//       // Fetch the full conversation once to populate the thread
//       const conv = await fetchConversation(json.conversationId);
//       if (conv) setConversation(conv); // ← this triggers the socket useEffect above
//       setFirstMsg("");
//       setStep("chat");
//     } catch (err: any) {
//       setInfoErrors({
//         form: err.message ?? "Something went wrong. Try again.",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ── Send a follow-up message ──────────────────────────────────────────────
//   // Uses REST to send (saves to DB), then updates local state optimistically.
//   // The backend will also emit conversation:updated via socket, but we apply
//   // the update immediately so there's zero perceived delay for the sender.
//   const handleSendReply = async () => {
//     if (!replyText.trim() || !conversation) return;

//     const textToSend = replyText.trim();
//     setSendingReply(true);

//     // Optimistic update — add message to local state immediately
//     const optimisticMessage: Message = {
//       id: `temp-${Date.now()}`,
//       sender: "VISITOR",
//       text: textToSend,
//       createdAt: new Date().toISOString(),
//     };
//     setConversation((prev) =>
//       prev
//         ? { ...prev, messages: [...prev.messages, optimisticMessage] }
//         : prev,
//     );
//     setReplyText("");

//     try {
//       const res = await fetch(`${BACKEND}/api/conversations/message`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: name,
//           email: email.toLowerCase(),
//           countryCode,
//           phoneNumber: phone,
//           type: queryType,
//           text: textToSend,
//         }),
//       });
//       const json = await res.json();
//       if (!json.success) throw new Error(json.message);

//       // Replace optimistic message with real data from server
//       const conv = await fetchConversation(conversation.id);
//       if (conv) setConversation(conv);
//     } catch (err: any) {
//       // Revert optimistic update on failure
//       setConversation((prev) =>
//         prev
//           ? {
//               ...prev,
//               messages: prev.messages.filter(
//                 (m) => m.id !== optimisticMessage.id,
//               ),
//             }
//           : prev,
//       );
//       setReplyText(textToSend); // restore typed text
//       alert(err.message ?? "Failed to send. Try again.");
//     } finally {
//       setSendingReply(false);
//     }
//   };

//   // ── End chat ──────────────────────────────────────────────────────────────
//   const handleEndChat = () => {
//     clearSession();
//     stopPolling();
//     socketRef.current?.disconnect();
//     socketRef.current = null;
//     setConversation(null);
//     setSocketOnline(false);
//     setStep("info");
//     setName("");
//     setEmail("");
//     setPhone("");
//     setFirstMsg("");
//     setInfoErrors({});
//     setIsOpen(false);
//   };

//   // ── Enter to send ─────────────────────────────────────────────────────────
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       step === "chat" ? handleSendReply() : handleInfoSubmit();
//     }
//   };

//   // ─── Render ───────────────────────────────────────────────────────────────
//   return (
//     <>
//       <div className="fixed bottom-4 right-4 md:bottom-5 md:right-5 z-40 flex flex-col items-end gap-2">
//         {/* Login */}
//         <button
//           type="button"
//           aria-label="Login"
//           className="group relative bg-slate-700 hover:bg-slate-800 text-white p-2.5 md:p-3 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
//         >
//           <CiLogin className="w-6 h-6 md:w-7 md:h-7" />
//           <span className={LABEL_CLASS}>Login</span>
//         </button>

//         {/* Contact Us */}
//         <Link
//           href="/contact"
//           aria-label="Contact Us"
//           className="group relative bg-slate-700 hover:bg-slate-800 text-white p-2.5 md:p-3 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
//         >
//           <RiContactsLine className="w-6 h-6 md:w-7 md:h-7" />
//           <span className={LABEL_CLASS}>Contact Us</span>
//         </Link>

//         {/* Chat button */}
//         <div className="relative">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label="Chat with us"
//             className="contact-button group relative bg-slate-700 hover:bg-slate-800 text-white p-1.5 md:p-2 rounded-xl shadow-lg hover:shadow-2xl flex items-center justify-center transition-shadow duration-300"
//             style={{ perspective: "700px" }}
//           >
//             <span className="chat-mascot-tilt block">
//               <Image
//                 src="/mascot-chat.png"
//                 alt=""
//                 aria-hidden="true"
//                 width={40}
//                 height={40}
//                 className="chat-mascot w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-md"
//               />
//             </span>
//             <span className={LABEL_CLASS}>Chat with us</span>
//           </button>

//           {/* Notification dot */}
//           <span className="absolute top-0 right-0 flex h-3 w-3">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
//             <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
//           </span>

//           {/* ── Chat popup ── */}
//           {isOpen && (
//             <>
//               <div
//                 className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//                 onClick={() => setIsOpen(false)}
//               />

//               <div
//                 className="fixed right-4 md:right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)]
//                 bottom-32 max-h-[520px] md:bottom-32 md:max-h-[560px]
//                 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:max-h-[600px]
//                 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden
//                 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4"
//               >
//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 flex items-center justify-between shrink-0">
//                   <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
//                       <MessageSquare className="w-4 h-4 text-white" />
//                     </div>
//                     <div>
//                       <p className="text-white text-sm font-semibold">
//                         SFJ Support
//                       </p>
//                       <p className="text-white/70 text-xs flex items-center gap-1">
//                         {step === "chat" ? (
//                           socketOnline ? (
//                             <>
//                               <Wifi className="w-3 h-3" /> Live
//                             </>
//                           ) : (
//                             <>
//                               <WifiOff className="w-3 h-3" /> Reconnecting…
//                             </>
//                           )
//                         ) : (
//                           "We reply within 24h"
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     {step === "chat" && (
//                       <button
//                         onClick={handleEndChat}
//                         className="text-white/70 hover:text-white text-xs underline transition-colors"
//                       >
//                         End chat
//                       </button>
//                     )}
//                     <button
//                       onClick={() => setIsOpen(false)}
//                       className="text-white/70 hover:text-white transition-colors"
//                     >
//                       <ChevronDown className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* ── Info form ── */}
//                 {step === "info" && (
//                   <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
//                     <p className="text-sm text-gray-600">
//                       Hi there! Tell us a bit about yourself and we'll get back
//                       to you.
//                     </p>

//                     {infoErrors.form && (
//                       <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
//                         {infoErrors.form}
//                       </p>
//                     )}

//                     <div>
//                       <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => {
//                           setName(e.target.value);
//                           setInfoErrors((p) => ({ ...p, name: "" }));
//                         }}
//                         placeholder="Your Name"
//                         className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                       />
//                       {infoErrors.name && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {infoErrors.name}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => {
//                           setEmail(e.target.value);
//                           setInfoErrors((p) => ({ ...p, email: "" }));
//                         }}
//                         placeholder="Email Address"
//                         className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                       />
//                       {infoErrors.email && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {infoErrors.email}
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         value={countryCode}
//                         onChange={(e) => setCountryCode(e.target.value)}
//                         placeholder="+91"
//                         className="w-16 px-2 py-2.5 border border-gray-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-blue-500 outline-none"
//                       />
//                       <input
//                         type="tel"
//                         value={phone}
//                         onChange={(e) => {
//                           setPhone(e.target.value);
//                           setInfoErrors((p) => ({ ...p, phone: "" }));
//                         }}
//                         placeholder="Phone Number"
//                         className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                       />
//                     </div>
//                     {infoErrors.phone && (
//                       <p className="text-xs text-red-500">{infoErrors.phone}</p>
//                     )}

//                     <div>
//                       <textarea
//                         rows={3}
//                         value={firstMsg}
//                         onChange={(e) => {
//                           setFirstMsg(e.target.value);
//                           setInfoErrors((p) => ({ ...p, firstMsg: "" }));
//                         }}
//                         onKeyDown={handleKeyDown}
//                         placeholder="How can we help you today?"
//                         className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
//                       />
//                       {infoErrors.firstMsg && (
//                         <p className="text-xs text-red-500 mt-1">
//                           {infoErrors.firstMsg}
//                         </p>
//                       )}
//                     </div>

//                     <button
//                       onClick={handleInfoSubmit}
//                       disabled={submitting}
//                       className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
//                         text-white text-sm font-medium py-2.5 rounded-lg transition-all
//                         flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {submitting ? (
//                         <>
//                           <Loader2 className="w-4 h-4 animate-spin" /> Starting
//                           chat…
//                         </>
//                       ) : (
//                         <>
//                           <Send className="w-4 h-4" /> Start Chat
//                         </>
//                       )}
//                     </button>

//                     <p className="text-xs text-gray-400 text-center">
//                       By chatting, you agree to our{" "}
//                       <a href="#" className="text-blue-500 hover:underline">
//                         Terms
//                       </a>{" "}
//                       &amp;{" "}
//                       <a href="#" className="text-blue-500 hover:underline">
//                         Privacy Policy
//                       </a>
//                       .
//                     </p>
//                   </div>
//                 )}

//                 {/* ── Chat thread ── */}
//                 {step === "chat" && conversation && (
//                   <>
//                     <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
//                       {conversation.messages.map((msg) => (
//                         <div
//                           key={msg.id}
//                           className={`flex ${msg.sender === "VISITOR" ? "justify-end" : "justify-start"}`}
//                         >
//                           {msg.sender === "ADMIN" && (
//                             <div
//                               className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-600
//                               flex items-center justify-center text-white text-xs font-bold mr-2 shrink-0 mt-auto"
//                             >
//                               S
//                             </div>
//                           )}
//                           <div
//                             className={`max-w-[75%] flex flex-col gap-0.5 ${msg.sender === "VISITOR" ? "items-end" : "items-start"}`}
//                           >
//                             <div
//                               className={`px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
//                               ${
//                                 msg.sender === "VISITOR"
//                                   ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm opacity-90"
//                                   : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm"
//                               }
//                               ${msg.id.startsWith("temp-") ? "opacity-60" : ""}
//                             `}
//                             >
//                               {msg.text}
//                             </div>
//                             <span className="text-[10px] text-gray-400 px-1">
//                               {msg.id.startsWith("temp-")
//                                 ? "Sending…"
//                                 : formatTime(msg.createdAt)}
//                             </span>
//                           </div>
//                         </div>
//                       ))}

//                       {conversation.messages.every(
//                         (m) => m.sender === "VISITOR",
//                       ) && (
//                         <div className="text-center py-2">
//                           <p className="text-xs text-gray-400 bg-white rounded-full px-3 py-1 inline-block shadow-sm border border-gray-100">
//                             Our team will reply soon ✦
//                           </p>
//                         </div>
//                       )}

//                       <div ref={messagesEnd} />
//                     </div>

//                     {/* Reply input */}
//                     <div className="shrink-0 border-t border-gray-100 px-3 py-3 bg-white">
//                       <div className="flex gap-2 items-end">
//                         <textarea
//                           rows={1}
//                           value={replyText}
//                           onChange={(e) => setReplyText(e.target.value)}
//                           onKeyDown={handleKeyDown}
//                           placeholder="Type a message…"
//                           className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm
//                             focus:ring-2 focus:ring-blue-500 outline-none resize-none max-h-24 overflow-y-auto"
//                           style={{ minHeight: "38px" }}
//                         />
//                         <button
//                           onClick={handleSendReply}
//                           disabled={sendingReply || !replyText.trim()}
//                           className="bg-gradient-to-r from-blue-500 to-purple-600 text-white
//                             p-2 rounded-xl transition-all disabled:opacity-40 shrink-0
//                             hover:from-blue-600 hover:to-purple-700"
//                         >
//                           {sendingReply ? (
//                             <Loader2 className="w-4 h-4 animate-spin" />
//                           ) : (
//                             <Send className="w-4 h-4" />
//                           )}
//                         </button>
//                       </div>
//                       <p className="text-[10px] text-gray-300 mt-1.5 text-center">
//                         Enter to send · Shift+Enter for new line
//                       </p>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SFJContactForm;

"use client";
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import {
  Send,
  ChevronDown,
  MessageSquare,
  Loader2,
  Wifi,
  WifiOff,
} from "lucide-react";
import { RiContactsLine } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { CiLogin } from "react-icons/ci";
import { io, Socket } from "socket.io-client";

type MessageSender = "VISITOR" | "ADMIN";
interface Message {
  id: string;
  sender: MessageSender;
  text: string;
  createdAt: string;
}
interface Conversation {
  id: string;
  visitorName: string;
  visitorEmail: string;
  status: string;
  messages: Message[];
}
type ChatStep = "info" | "chat";

const BACKEND =
  process.env.NEXT_PUBLIC_SFJ_BACKEND_URL ?? "http://localhost:8008";
const SOCKET_URL =
  process.env.NEXT_PUBLIC_SFJ_BACKEND_URL ?? "http://localhost:8008";
const POLL_MS = 10000;

const LABEL_CLASS =
  "pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-2 " +
  "whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-medium " +
  "text-white shadow-lg opacity-0 translate-x-1 transition-all duration-200 " +
  "group-hover:opacity-100 group-hover:translate-x-0 " +
  "group-focus-visible:opacity-100 group-focus-visible:translate-x-0";

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
function saveSession(data: {
  conversationId: string;
  name: string;
  email: string;
  phone: string;
}) {
  localStorage.setItem("sfj_chat_session", JSON.stringify(data));
}
function loadSession(): {
  conversationId: string;
  name: string;
  email: string;
  phone: string;
} | null {
  try {
    const raw = localStorage.getItem("sfj_chat_session");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function clearSession() {
  localStorage.removeItem("sfj_chat_session");
}

async function apiFetchConversation(id: string): Promise<Conversation | null> {
  try {
    const res = await fetch(`${BACKEND}/api/conversations/${id}`);
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

const SFJContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ChatStep>("info");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [queryType] = useState("general");
  const [firstMsg, setFirstMsg] = useState("");
  const [infoErrors, setInfoErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [socketOnline, setSocketOnline] = useState(false);

  // Refs — reading ref.current inside a closure always gets the LATEST value.
  // This is the key fix for the stale closure bug.
  const socketRef = useRef<Socket | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const convIdRef = useRef<string | null>(null);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages.length]);

  // stopPoll and startPoll are plain functions (not useCallback).
  // They access pollRef and socketRef directly so they are never stale.
  function stopPoll() {
    if (pollRef.current !== null) {
      clearInterval(pollRef.current);
      pollRef.current = null;
      console.log("[poll] stopped");
    }
  }

  function startPoll(convId: string, onData: (c: Conversation) => void) {
    stopPoll();
    console.log("[poll] starting fallback every", POLL_MS, "ms");
    pollRef.current = setInterval(async () => {
      if (socketRef.current?.connected) {
        stopPoll();
        return;
      }
      const conv = await apiFetchConversation(convId);
      if (conv) onData(conv);
    }, POLL_MS);
  }

  // Socket setup — triggers when step becomes "chat".
  // convIdRef is already set before step changes so it's safe to read here.
  useEffect(() => {
    if (step !== "chat") return;
    const convId = convIdRef.current;
    if (!convId) return;
    if (socketRef.current) return; // prevent double-connect

    console.log("[socket] connecting for conv:", convId);
    const socket = io(SOCKET_URL, {
      path: "/socket.io",
      transports: ["websocket", "polling"],
      reconnectionAttempts: 15,
      reconnectionDelay: 3000,
      reconnectionDelayMax: 10000,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[socket] connected:", socket.id);
      setSocketOnline(true);
      stopPoll(); // socket up — kill any running poll
      socket.emit("join:conversation", { conversationId: convIdRef.current });
    });

    socket.on("conversation:updated", (updated: Conversation) => {
      if (updated.id === convIdRef.current) {
        setConversation(updated); // instant update — no API call
      }
    });

    socket.on("disconnect", (reason) => {
      console.log("[socket] disconnected:", reason);
      setSocketOnline(false);
      if (convIdRef.current) startPoll(convIdRef.current, setConversation);
    });

    // socket.io.on("reconnect") fires after the manager successfully reconnects
    socket.io.on("reconnect", () => {
      console.log("[socket] reconnected");
      setSocketOnline(true);
      stopPoll(); // socket back — kill poll immediately
      socket.emit("join:conversation", { conversationId: convIdRef.current });
    });

    socket.on("connect_error", (err) => {
      console.warn("[socket] connect_error:", err.message);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("conversation:updated");
      socket.off("connect_error");
      socket.io.off("reconnect");
      socket.disconnect();
      socketRef.current = null;
      stopPoll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Restore session on mount
  useEffect(() => {
    const session = loadSession();
    if (!session) return;
    setName(session.name);
    setEmail(session.email);
    setPhone(session.phone);
    convIdRef.current = session.conversationId;
    apiFetchConversation(session.conversationId).then((conv) => {
      if (conv) {
        setConversation(conv);
        setStep("chat");
      }
    });
  }, []);

  const handleInfoSubmit = async () => {
    const errors: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) errors.name = "Enter your name";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Enter a valid email";
    if (!phone.trim() || !/^\d{10,15}$/.test(phone))
      errors.phone = "Enter a valid phone number";
    if (!firstMsg.trim()) errors.firstMsg = "Enter your message";
    if (Object.keys(errors).length > 0) {
      setInfoErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${BACKEND}/api/conversations/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          countryCode,
          phoneNumber: phone.trim(),
          type: queryType,
          text: firstMsg.trim(),
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      // Set ref BEFORE changing step — socket useEffect reads it immediately
      convIdRef.current = json.conversationId;
      saveSession({ conversationId: json.conversationId, name, email, phone });

      const conv = await apiFetchConversation(json.conversationId);
      if (conv) setConversation(conv);
      setFirstMsg("");
      setStep("chat");
    } catch (err: any) {
      setInfoErrors({
        form: err.message ?? "Something went wrong. Try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendReply = async () => {
    if (!replyText.trim() || !conversation) return;
    const textToSend = replyText.trim();
    setReplyText("");

    const optimistic: Message = {
      id: `temp-${Date.now()}`,
      sender: "VISITOR",
      text: textToSend,
      createdAt: new Date().toISOString(),
    };
    setConversation((prev) =>
      prev ? { ...prev, messages: [...prev.messages, optimistic] } : prev,
    );

    setSendingReply(true);
    try {
      const res = await fetch(`${BACKEND}/api/conversations/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: email.toLowerCase(),
          countryCode,
          phoneNumber: phone,
          type: queryType,
          text: textToSend,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      // Server will emit conversation:updated via socket which updates state.
      // But also fetch once to replace the optimistic message with real IDs.
      const conv = await apiFetchConversation(conversation.id);
      if (conv) setConversation(conv);
    } catch (err: any) {
      setConversation((prev) =>
        prev
          ? {
              ...prev,
              messages: prev.messages.filter((m) => m.id !== optimistic.id),
            }
          : prev,
      );
      setReplyText(textToSend);
      alert(err.message ?? "Failed to send. Try again.");
    } finally {
      setSendingReply(false);
    }
  };

  const handleEndChat = () => {
    clearSession();
    stopPoll();
    socketRef.current?.disconnect();
    socketRef.current = null;
    convIdRef.current = null;
    setConversation(null);
    setSocketOnline(false);
    setStep("info");
    setName("");
    setEmail("");
    setPhone("");
    setFirstMsg("");
    setInfoErrors({});
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      step === "chat" ? handleSendReply() : handleInfoSubmit();
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 md:bottom-5 md:right-5 z-40 flex flex-col items-end gap-2">
        <button
          type="button"
          aria-label="Login"
          className="group relative bg-slate-700 hover:bg-slate-800 text-white p-2.5 md:p-3 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
        >
          <CiLogin className="w-6 h-6 md:w-7 md:h-7" />
          <span className={LABEL_CLASS}>Login</span>
        </button>

        <Link
          href="/contact"
          aria-label="Contact Us"
          className="group relative bg-slate-700 hover:bg-slate-800 text-white p-2.5 md:p-3 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
        >
          <RiContactsLine className="w-6 h-6 md:w-7 md:h-7" />
          <span className={LABEL_CLASS}>Contact Us</span>
        </Link>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Chat with us"
            className="contact-button group relative bg-slate-700 hover:bg-slate-800 text-white p-1.5 md:p-2 rounded-xl shadow-lg hover:shadow-2xl flex items-center justify-center transition-shadow duration-300"
            style={{ perspective: "700px" }}
          >
            <span className="chat-mascot-tilt block">
              <Image
                src="/mascot-chat.png"
                alt=""
                aria-hidden="true"
                width={40}
                height={40}
                className="chat-mascot w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-md"
              />
            </span>
            <span className={LABEL_CLASS}>Chat with us</span>
          </button>

          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </span>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                onClick={() => setIsOpen(false)}
              />

              <div
                className="fixed right-4 md:right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)]
                bottom-32 max-h-[520px] md:bottom-32 md:max-h-[560px]
                lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:max-h-[600px]
                bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden
                animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">
                        SFJ Support
                      </p>
                      <p className="text-white/70 text-xs flex items-center gap-1">
                        {step === "chat" ? (
                          socketOnline ? (
                            <>
                              <Wifi className="w-3 h-3" /> Live
                            </>
                          ) : (
                            <>
                              <WifiOff className="w-3 h-3" /> Reconnecting…
                            </>
                          )
                        ) : (
                          "We reply within 24h"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {step === "chat" && (
                      <button
                        onClick={handleEndChat}
                        className="text-white/70 hover:text-white text-xs underline transition-colors"
                      >
                        End chat
                      </button>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Info form */}
                {step === "info" && (
                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                    <p className="text-sm text-gray-600">
                      Hi there! Tell us a bit about yourself and we'll get back
                      to you.
                    </p>
                    {infoErrors.form && (
                      <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">
                        {infoErrors.form}
                      </p>
                    )}

                    <div>
                      <input
                        type="text"
                        value={name}
                        placeholder="Your Name"
                        onChange={(e) => {
                          setName(e.target.value);
                          setInfoErrors((p) => ({ ...p, name: "" }));
                        }}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      {infoErrors.name && (
                        <p className="text-xs text-red-500 mt-1">
                          {infoErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="email"
                        value={email}
                        placeholder="Email Address"
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setInfoErrors((p) => ({ ...p, email: "" }));
                        }}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      {infoErrors.email && (
                        <p className="text-xs text-red-500 mt-1">
                          {infoErrors.email}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={countryCode}
                        placeholder="+91"
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-16 px-2 py-2.5 border border-gray-200 rounded-lg text-sm text-center focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <input
                        type="tel"
                        value={phone}
                        placeholder="Phone Number"
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setInfoErrors((p) => ({ ...p, phone: "" }));
                        }}
                        className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    {infoErrors.phone && (
                      <p className="text-xs text-red-500">{infoErrors.phone}</p>
                    )}
                    <div>
                      <textarea
                        rows={3}
                        value={firstMsg}
                        placeholder="How can we help you today?"
                        onKeyDown={handleKeyDown}
                        onChange={(e) => {
                          setFirstMsg(e.target.value);
                          setInfoErrors((p) => ({ ...p, firstMsg: "" }));
                        }}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      />
                      {infoErrors.firstMsg && (
                        <p className="text-xs text-red-500 mt-1">
                          {infoErrors.firstMsg}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={handleInfoSubmit}
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Starting
                          chat…
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Start Chat
                        </>
                      )}
                    </button>
                    <p className="text-xs text-gray-400 text-center">
                      By chatting, you agree to our{" "}
                      <a href="#" className="text-blue-500 hover:underline">
                        Terms
                      </a>{" "}
                      &amp;{" "}
                      <a href="#" className="text-blue-500 hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                )}

                {/* Chat thread */}
                {step === "chat" && conversation && (
                  <>
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
                      {conversation.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === "VISITOR" ? "justify-end" : "justify-start"}`}
                        >
                          {msg.sender === "ADMIN" && (
                            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold mr-2 shrink-0 mt-auto">
                              S
                            </div>
                          )}
                          <div
                            className={`max-w-[75%] flex flex-col gap-0.5 ${msg.sender === "VISITOR" ? "items-end" : "items-start"}`}
                          >
                            <div
                              className={`px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap transition-opacity
                              ${msg.sender === "VISITOR" ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm" : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm"}
                              ${msg.id.startsWith("temp-") ? "opacity-60" : "opacity-100"}`}
                            >
                              {msg.text}
                            </div>
                            <span className="text-[10px] text-gray-400 px-1">
                              {msg.id.startsWith("temp-")
                                ? "Sending…"
                                : formatTime(msg.createdAt)}
                            </span>
                          </div>
                        </div>
                      ))}
                      {conversation.messages.every(
                        (m) => m.sender === "VISITOR",
                      ) && (
                        <div className="text-center py-2">
                          <p className="text-xs text-gray-400 bg-white rounded-full px-3 py-1 inline-block shadow-sm border border-gray-100">
                            Our team will reply soon ✦
                          </p>
                        </div>
                      )}
                      <div ref={messagesEnd} />
                    </div>

                    <div className="shrink-0 border-t border-gray-100 px-3 py-3 bg-white">
                      <div className="flex gap-2 items-end">
                        <textarea
                          rows={1}
                          value={replyText}
                          placeholder="Type a message…"
                          onChange={(e) => setReplyText(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none max-h-24 overflow-y-auto"
                          style={{ minHeight: "38px" }}
                        />
                        <button
                          onClick={handleSendReply}
                          disabled={sendingReply || !replyText.trim()}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-xl transition-all disabled:opacity-40 shrink-0 hover:from-blue-600 hover:to-purple-700"
                        >
                          {sendingReply ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-300 mt-1.5 text-center">
                        Enter to send · Shift+Enter for new line
                      </p>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SFJContactForm;
