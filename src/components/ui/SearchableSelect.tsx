import { type ComponentProps, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface SelectProps extends ComponentProps<"div"> {
    options: { value: any; label: string }[]
    label: string
}
const SearchableSelect = forwardRef<HTMLSelectElement, SelectProps>(
    ({ ...props }) => {
        return (
            <>

                <button id="dropdownUsersSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" className="inline-flex items-center justify-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
                    Dropdown button
                    <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" /></svg>
                </button>

                <div id="dropdownSearch" className="z-10 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-54">
                    <div className="bg-neutral-primary-medium border-b border-default-medium p-2 rounded-t-base">
                        <label htmlFor="search" className="sr-only">Search</label>
                        <input type="text" id="search" className="bg-neutral-secondary-strong border border-default-strong text-heading text-sm rounded focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="Search htmlFor users" required />
                    </div>
                    <ul className="h-48 p-2 text-sm text-body font-medium overflow-y-auto" aria-labelledby="dropdownSearchButton">
                        <li className="w-full flex items-center p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
                            <label htmlFor="dropdown-user-9" className="w-full flex items-center justify-between">

                                <input id="dropdown-user-9" type="checkbox" value="" className="w-4 h-4 border border-default-strong rounded-xs bg-neutral-secondary-strong focus:ring-2 focus:ring-brand-soft" />
                            </label>
                        </li>
                        <li className="w-full flex items-center p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
                            <label htmlFor="dropdown-user-10" className="w-full flex items-center justify-between">

                                <input id="dropdown-user-10" type="checkbox" value="" className="w-4 h-4 border border-default-strong rounded-xs bg-neutral-secondary-strong focus:ring-2 focus:ring-brand-soft" />
                            </label>
                        </li>

                    </ul>
                </div>
            </>
        )
    }
)
SearchableSelect.displayName = "Select"

export { SearchableSelect }
