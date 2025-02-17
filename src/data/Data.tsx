import React, { useState } from 'react';
import { iData } from './types';

const Data = (initialName: string = 'dataName', initialValue: string = 'finding...'): iData => {
    const [name, setName] = useState<string>(initialName);
    const [value, setValue] = useState<string>(initialValue);

    return {
        name,
        value,
        found: false
    };
};

export default Data;
