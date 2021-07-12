const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@font-family': 'Roboto, sans-serif',
                            '@primary-color': '#307dd2',
                            '@warning-color': '#ffcd07',
                            '@error-color': '#f05050',
                            '@success-color': '#23ad44',
                            '@info-1-col      or': '#6c6fbf',
                            '@info-2-color': '#23b7e5',
                            '@dark': '#101025',
                            '@cool-grey': '#99a6ad',
                            '@color-disable': '#f7f7f7',
                            '@dark-blue-grey': '#1a2d41',
                            '@border-color': '#dee5e7',

                            '@size-space': '16px',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
