import { ReactNode } from "react";

export interface HasDescription {
  description: string;
}

export interface HasChildren {
  children: ReactNode;
}

export interface IdParam {
  id: string;
}

export interface MightBeSystemRecord {
  isSystemRecord: boolean;
}

export interface MightHaveChildren {
  children?: ReactNode;
}

export interface MightHaveClassName {
  className?: string;
}

export interface MightHaveReferrer {
  referrer?: string;
}

export interface Model {
  id: string;
  createdAt: string;
  modifiedAt: string;
}
