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

export default function ProfileIcon({ gender, name }: ProfileIconProps) {
  const avatarSrc =
    gender === "Male"
      ? "/male_icon.jpeg"
      : gender === "Female"
        ? "/female_icon.png"
        : "https://github.com/shadcn.png"; // default

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
