// React
import { Dispatch, FC, SetStateAction } from "react";

// Typings
import { QuizItem } from "@/types/typings";

// Sortable
import SortableList, { SortableItem, SortableKnob } from "react-easy-sort";

// Icons
import { TbGripHorizontal } from 'react-icons/tb';
import { arrayMoveImmutable } from "array-move";


interface DraggableListProps {
    items: QuizItem[]
    setItems: Dispatch<SetStateAction<QuizItem[]>>;
}

const DraggableList: FC<DraggableListProps> = ({ items, setItems }) => {

    // Swapping items in array
    //
    const onSortEnd = (oldIndex: number, newIndex: number) => {
        setItems((array) => arrayMoveImmutable(array, oldIndex, newIndex))
    }

    return (
        <>
            <div>
                <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
                    {items.map((item, i) => (
                        <SortableItem key={i}>
                            <div className="group cursor-n-resize relative w-full flex items-center mb-4 pr-2 py-2 rounded-lg backdrop-blur-3xl bg-black/20 select-none">

                                <div className="p-4 transition-all opacity-10 group-hover:opacity-50">
                                    <TbGripHorizontal />
                                </div>

                                <div>
                                    {item.content}
                                </div>

                            </div>
                        </SortableItem>
                    ))}
                </SortableList>
            </div>
        </>
    )

}

export default DraggableList;