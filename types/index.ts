import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    btnType?: "button" | "submit";
    textStyles?: string;
    rightIcon?: string;
    isDisabled?: boolean;
    handleClick?: MouseEventHandler<HTMLButtonElement>
}

export interface searchBarProps {
    setModel: React.Dispatch<React.SetStateAction<string>>
    setManufacturer: React.Dispatch<React.SetStateAction<string>>
}

export interface SearchManufacturerProps {
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>
}

export interface OptionProps {
    title: string;
    value: string;
}

export interface CustomFilterProps {
    options: OptionProps[];
    setFilter: React.Dispatch<React.SetStateAction<string>>

}

export interface CarProps {
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
}

export type CarState = CarProps[] & { message?: string };

export interface FilterProps {
    manufacturer: string;
    model: string;
    year: number;
    fuel: string;
    limit: number;
    pageNumber? : number;
}

export interface ShowMoreProps {
    pageNumber: number;
    isNext: boolean;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
}