import { ExpenseCategory, ExpenseNature } from "@/types/enums";


export default function GetNatureOfExpense(category: ExpenseCategory | string) {
    switch (category) {
        case ExpenseCategory.housing:
            return ExpenseNature.need;
        case ExpenseCategory.transportation:
            return ExpenseNature.need;
        case ExpenseCategory.food:
            return ExpenseNature.need;
        case ExpenseCategory.health:
            return ExpenseNature.need;
        case ExpenseCategory.entertainment:
            return ExpenseNature.want;
        case ExpenseCategory.selfcare:
            return ExpenseNature.want;
        case ExpenseCategory.other:
            return ExpenseNature.want;

        // case
        //     ExpenseCategory.housing ||
        //     ExpenseCategory.transportation ||
        //     ExpenseCategory.food ||
        //     ExpenseCategory.health ||
        //     "housing" ||
        //     "transportation" ||
        //     "food" ||
        //     "health"
        //     :
        //     return ExpenseNature.need;
        // case
        //     ExpenseCategory.entertainment ||
        //     ExpenseCategory.selfcare ||
        //     ExpenseCategory.other ||
        //     "entertainment" ||
        //     "selfcare" ||
        //     "other"
        //     :
        //     return ExpenseNature.want;
    }
}