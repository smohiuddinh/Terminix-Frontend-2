import Select from 'react-select';
import { memo } from 'react';

function ReactSelect({ selectedOption = null, onChange, option = [], placeholder = 'select', value }) {
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
        menu: (base) => ({
            ...base,
            zIndex: 9999,
        }),
        menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
        }),
        indicatorSeparator: () => ({ display: "none" }),
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
            menuPortalTarget={document.body}   // 🔥 Key fix
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
