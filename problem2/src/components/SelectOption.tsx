import React from 'react';
import { Select } from 'antd';

type SelectOptionType = {
    dataSource?: Array<{ value: string; label: string, code: string }>;
    onSelect?: (value: string) => void;
    open?: boolean;
    setOpen?: (open: boolean) => void;
}

const SelectOption = ({ dataSource = [], onSelect, open=false, setOpen }: SelectOptionType) => {
    console.log('ThanhNguyen:: open', open);
    return (
        <Select
        defaultOpen={open}
        // open={open}
        autoFocus={true}
        onDropdownVisibleChange={setOpen}
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select"
            // optionFilterProp="label"
            filterSort={(optionA, optionB) =>
                (optionA?.label?.props?.children[1] ?? '').toLowerCase().localeCompare((optionB?.label?.props?.children[1] ?? '').toLowerCase())
            }
    
            filterOption={(input, option) =>
                (option?.label as unknown as string).toLowerCase().includes(input.toLowerCase())
            }
            optionFilterProp="children"
            // onChange={onSelect}
            onChange={(value) => {
                onSelect?.(value);
                setOpen?.(false); // ✅ Đóng Select sau khi chọn xong
              }}
            options={dataSource.map((country) => ({
                value: country.code,
                label: (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={`https://img.geonames.org/flags/x/${country.code}.gif`}
                            alt={country.label}
                            width="20"
                            style={{ marginRight: 10 }}
                        />
                        {country.label}
                    </div>
                ),
            }))}
        />
    );
}

export default SelectOption;