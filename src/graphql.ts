
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Profile {
    id: string;
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
    id: string;
    name: string;
    description: string;
    sourceUrl: string;
    demoUrl?: Nullable<string>;
    profile: Profile;
}

export class Skill {
    id: string;
    name: string;
    category: string;
    profile: Profile;
}

export class WorkExperience {
    id: string;
    company: string;
    position: string;
    startDate: Date;
    endDate: Date;
    achievements: string;
    profile: Profile;
}

export abstract class IQuery {
    abstract profile(): Profile | Promise<Profile>;

    abstract skills(): Skill[] | Promise<Skill[]>;

    abstract experience(): WorkExperience[] | Promise<WorkExperience[]>;

    abstract projects(): Project[] | Promise<Project[]>;
}

export type JSON = any;
type Nullable<T> = T | null;
