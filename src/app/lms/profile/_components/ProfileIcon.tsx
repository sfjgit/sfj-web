import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileIconProps {
  gender: string | undefined;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ProfileIcon({ gender, name }: ProfileIconProps) {
  // Both gendered icon files (/male_icon.jpeg, /female_icon.png) were missing
  // from public/, and the "default" branch hot-linked github.com/shadcn.png —
  // a scaffolding placeholder that shipped to production and leaks a request
  // to GitHub on every profile render. One neutral, locally-served avatar; the
  // AvatarFallback below still shows the user's initials while it loads.
  const avatarSrc = "/default-avatar.svg";

  return (
    <div className="w-1/2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex p-2 rounded-full items-center !w-full gap-3 border border-foreground bg-background">
            <Avatar>
              <AvatarImage src={avatarSrc} alt={name} />
              <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <span className="border-1 border-gray-400 w-0 h-8"></span>
            <div className="flex justify-center font-bold text-lg">
              <p className="font-bold text-lg">{name}</p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuGroup>
            {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
            {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
