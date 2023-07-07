import { useEffect, useState } from 'react';

export function getText(key: string) {
	  const [Text, setText] = useState('');
    useEffect(() => {
        const fetchData = async () => {
					const url = 'http://localhost:3000/lang/' + key;
					let lang = 'en';
					if (document.cookie) {
						lang = document.cookie.split('=')[1];
					}
          const response = await fetch(url, { headers: { 'Accept-language': lang } });
          const data = await response.text();
          setText(data);
        };
        fetchData();
    }, []);
	return Text;
}