/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail, FileAxis3D } from "lucide-react";

const OfficeSelector = () => {
  const [selectedOffice, setSelectedOffice] = useState("india");

  const offices: any = {
    india: {
      flag: "🇮🇳",
      name: "India - Head Office",
      company: "SFJ Business Solutions Pvt. Ltd.",
      address: [
        "Uma Sree Dream World, Unit -2,",
        "B-Block, 4th Floor, Kudlu Gate,",
        "Hosur Main Road,",
        "Bangalore – 560068. Karnataka, INDIA",
      ],
      phone: "+91 80 4158333",
      email: "sales@sfjbs.com",
    },
    uae: {
      flag: "🇦🇪",
      name: "UAE Office",
      company: "SFJ Computers Consulting",
      address: [
        "214, Blue Tower, Sheikh Zayed Road,",
        "(Next To Crown Plaza Hotel)",
        "P.O. Box : 58575, Dubai, UAE",
      ],
      phone: "+971 43 425125",
      fax: "+971 43 425126",
    },
    singapore: {
      flag: "🇸🇬",
      name: "Singapore Office",
      company: "SFJ Business Solutions Pte. Ltd.",
      address: ["2 KALLANG AVENUE,", "#08-16, CT HUB,", "Singapore – 339 407"],
      phone: "+65 62935695",
      fax: "+65 62935657",
    },
    usa: {
      flag: "🇺🇸",
      name: "United States Office",
      company: "SFJ Business Solutions LLC",
      address: [
        "2055, limestone RD STE 200-C,",
        "Wilmington,",
        "DE 19808, USA",
      ],
    },
  };

  return (
    <div className="flex items-center gap-6 justify-center">
      {/* Office Dropdown */}

      {/* Selected Office Address */}
      <div>
        <div className="flex flex-wrap">
          <div className="flex flex-wrap">
            <h4 className="font-semibold text-gray-900">
              {offices[selectedOffice].company}
            </h4>
          </div>
          <div className="text-sm text-gray-600 space-y-1 flex flex-wrap items-center justify-center gap-y-2">
            {offices[selectedOffice].address.map(
              (line: string, index: number) => (
                <p key={index}>{line}</p>
              )
            )}
            {offices[selectedOffice].phone && (
              <div className="flex items-center space-x-1 pl-2">
                <Phone className="w-4 h-4" />
                <span>{offices[selectedOffice].phone}</span>
              </div>
            )}
            {offices[selectedOffice].email && (
              <div className="flex items-center space-x-1 pl-2">
                <Mail className="w-4 h-4" />
                <span>{offices[selectedOffice].email}</span>
              </div>
            )}
            {offices[selectedOffice].fax && (
              <div className="flex items-center space-x-1 pl-2">
                <FileAxis3D className="w-4 h-4" />
                <span>Fax: {offices[selectedOffice].fax}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-w-48">
        <Select value={selectedOffice} onValueChange={setSelectedOffice}>
          <SelectTrigger className="w-fit">
            <SelectValue>
              <div className="flex items-center space-x-2">
                <span className="text-lg ">{offices[selectedOffice].flag}</span>
                {/* <span className="text-sm">{offices[selectedOffice].name}</span> */}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(offices).map(([key, office]) => (
              <SelectItem key={key} value={key}>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">
                    {
                      // @ts-ignore
                      office.flag
                    }
                  </span>
                  <span className="text-sm">
                    {
                      // @ts-ignore

                      office.name
                    }
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OfficeSelector;
