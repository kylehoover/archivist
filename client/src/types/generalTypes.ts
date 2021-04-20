import { ReactNode } from "react";

export interface HasDescription {
  description: string;
}

export interface HasChildren {
  children: ReactNode;
}

export interface MightBeSystemRecord {
  isSystemRecord: boolean;
}

export interface Model {
  id: string;
  createdAt: string;
  modifiedAt: string;
}
