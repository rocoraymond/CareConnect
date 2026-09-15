"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, UserRole } from "@/types/user";
import { MOCK_USERS } from "@/lib/mock/users";

interface DemoContextType {
  currentUser: UserProfile;
  activeRole: UserRole;
  switchRole: (role: UserRole) => void;
  isSwitcherOpen: boolean;
  setIsSwitcherOpen: (open: boolean) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRole] = useState<UserRole>("caregiver");
  const [currentUser, setCurrentUser] = useState<UserProfile>(MOCK_USERS.caregiver);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  const switchRole = (role: UserRole) => {
    setActiveRole(role);
    if (MOCK_USERS[role]) {
      setCurrentUser(MOCK_USERS[role]);
    }
  };

  return (
    <DemoContext.Provider
      value={{
        currentUser,
        activeRole,
        switchRole,
        isSwitcherOpen,
        setIsSwitcherOpen,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
}
