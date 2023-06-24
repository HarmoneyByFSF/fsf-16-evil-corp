import { QuizItem } from "@/types/typings";

export default function setOptions(options: string[]) {
    return [
        { id: 0, content: options[0] },
        { id: 1, content: options[1] },
        { id: 2, content: options[2] },
        { id: 3, content: options[3] }
    ] as QuizItem[];
}