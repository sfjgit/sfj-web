// import axios from "axios";

// // Proxied through the /api/faculty rewrite in next.config.ts (which forwards
// // to NEXT_PUBLIC_NOTIFICATION_SERVICE_URL), so calls stay same-origin and
// // never need CORS on the notification service.
// const facultyRegistrationApi = axios.create({
//   baseURL: "/api/faculty",
// });

// export default facultyRegistrationApi;

import axios from "axios";

const facultyRegistrationApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SFJ_BACKEND_URL}/api/faculty`,
  withCredentials: true,
});

export default facultyRegistrationApi;
