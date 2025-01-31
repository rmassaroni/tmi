import React, { useState, useEffect } from 'react';
import Data from './Data';
import { iData } from './types';
import axios from "axios";
import TestAxios from '../tests/Axios';

const IP = (): iData => {
    const [value, setValue] = useState<string>("Fetching...");

    // axios.get("https://ipapi.co/json/")
    //     .then(response => {
    //         setValue( response.data.ip );
    //     })
    //     .catch(() => setValue( "❌ Blocked" ));


    setValue(TestAxios().ip);

    return {
        // ...Data('IP', value),
        name: 'IP',
        value: value
    };
};

export default IP;
