import { ReactNode } from "react";

export interface HasChildren {
  children: ReactNode;
}

export interface IdParam {
  id: string;
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
