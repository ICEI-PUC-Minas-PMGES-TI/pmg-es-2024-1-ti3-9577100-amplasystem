import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

interface MaskOptions { 
    prefix?: string;
    suffix?: string;
    includeThousandsSeparator?: boolean;
    thousandsSeparatorSymbol?: string;
    allowDecimal?: boolean;
    decimalSymbol?: string;
    decimalLimit?: number;
    integerLimit?: number;
    allowNegative?: boolean;
    allowLeadingZeroes?: boolean;
};

interface CurrencyInputProps {
    maskOptions?: MaskOptions;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    inputMode?: 'numeric' | 'search' | 'none' | 'text' | 'tel' | 'url' | 'email' | 'decimal';
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: any;
    type?: any;
    value?: any;
    name?:any;
};

const defaultMaskOptions = {
    prefix: 'R$',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ' ',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2, 
    integerLimit: 100, 
    allowNegative: false,
    allowLeadingZeroes: false,
};

const CurrencyInput: React.FC<CurrencyInputProps> = ({ maskOptions, ...inputProps }) => {
    const currencyMask = createNumberMask({
        ...defaultMaskOptions,
        ...maskOptions,
    });

    return (
        <div className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-wb57ya-MuiFormControl-root-MuiTextField-root">
            <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-1ddq39s-MuiInputBase-root-MuiOutlinedInput-root">
                <MaskedInput
                    mask={currencyMask}
                    {...inputProps}
                    style={{
                        width: '100%',
                        padding: '16.5px 14px',
                    }}
                />
                <fieldset
                    aria-hidden="true"
                    className="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"
                >
                    <legend className="css-ihdtdm">
                        <span className="notranslate" />
                    </legend>
                </fieldset>
            </div>
        </div>
    );
};

CurrencyInput.defaultProps = {
    inputMode: 'numeric',
    maskOptions: {},
};

CurrencyInput.propTypes = {
    inputMode: PropTypes.oneOf(['numeric', 'search', 'none', 'text', 'tel', 'url', 'email', 'decimal']),
    maskOptions: PropTypes.shape({
        prefix: PropTypes.string,
        suffix: PropTypes.string,
        includeThousandsSeparator: PropTypes.bool,
        thousandsSeparatorSymbol: PropTypes.string,
        allowDecimal: PropTypes.bool,
        decimalSymbol: PropTypes.string,
        decimalLimit: PropTypes.number,
        allowNegative: PropTypes.bool,
        allowLeadingZeroes: PropTypes.bool,
        integerLimit: PropTypes.number,
    }) as PropTypes.Validator<MaskOptions | undefined>, // Custom type assertion to match MaskOptions type
    onChange: PropTypes.func,
};

export default CurrencyInput;