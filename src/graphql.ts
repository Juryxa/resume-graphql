
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Profile {
    name: string;
    description: string;
    githubUrl: string;
    linkedinUrl?: Nullable<string>;
    otherLinks?: Nullable<JSON>;
    projects: Project[];
    skills: Skill[];
    workExperience: WorkExperience[];
}

export class Project {
    name: string;
    description: string;
    sourceUrl: string;
    demoUrl?: Nullable<string>;
}

export class Skill {
    name: string;
    category: string;
}

export class WorkExperience {
    company: string;
    position: string;
    startDate: DateTime;
    endDate: DateTime;
    achievements: string;
}

export abstract class IQuery {
    abstract profile(): Profile | Promise<Profile>;

    abstract skills(): Skill[] | Promise<Skill[]>;

    abstract experience(): WorkExperience[] | Promise<WorkExperience[]>;

    abstract projects(): Project[] | Promise<Project[]>;
}

export type JSON = Record<string, unknown>;
export type DateTime = Date;
type Nullable<T> = T | null;
