import Select from 'react-select';
import { memo } from 'react';

function ReactSelect({ selectedOption = null, onChange, option = [], placeholder = 'Select', value }) {
    const customStyles = {
        container: (base) => ({
            ...base,
            width: '100%',
        }),
        option: (provided) => ({
            ...provided,
            cursor: "pointer",
        }),
        control: (provided) => ({
            ...provided,
            minHeight: "45px",
        }),
        indicatorSeparator: () => ({ display: "none" }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999, // ensure on top
        }),
        menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
        }),
    };

    return (
        <Select
            placeholder={placeholder}
            defaultValue={selectedOption}
            onChange={onChange}
            options={option}
            value={value}
            isClearable={true}
            styles={customStyles}
            menuPortalTarget={typeof document !== 'undefined' ? document.body : null} // portal dropdown to body
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary25: "#a9e8e8",
                    primary: "#01AEAD",
                },
            })}
        />
    );
}

export default memo(ReactSelect);
