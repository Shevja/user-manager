import type {User} from "@/types";

export interface UserManagerTableProps {
    users: User[];
    draftErrors: Partial<Record<keyof User, string>>
}