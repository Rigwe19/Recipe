// import defaultTheme from 'tailwindcss/defaultTheme';
// import forms from '@tailwindcss/forms';
// import flowbite from 'flowbite/plugin';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './app/**/*.{js,jsx,tx,tsx}',
        // 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],

    theme: {
        extend: {
            fontFamily: {
                // sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
                MadimiOne: ['MadimiOne'],
                vesper: ['Vesper Libre']
            },
            colors: {
                primary: {
                    "50": "#fef1f7",
                    "100": "#fee5f0",
                    "200": "#fecce3",
                    "300": "#ffa2cb",
                    "400": "#fe68a7",
                    "500": "#f83c86",
                    "600": "#e91f64",
                    "700": "#ca0c47",
                    "800": "#a70d3b",
                    "900": "#8b1034",
                    "950": "#55021a"
                }
            },
        },
    },

    // plugins: [forms, flowbite({
    //     charts: true,
    // })],
};
