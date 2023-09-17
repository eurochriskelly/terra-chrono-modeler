////////////////////////////////////////////////////////////////////////////////
export const wrapCollection = (item = []) => {
    return {
        info: {
            _postman_id: 'postman-tests-dgrm-api',
            name: 'DGRM API Tests',
            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
        },
        item: item.filter((item) => !item.disabled),
    }
}

////////////////////////////////////////////////////////////////////////////////
export const processArgs = (ARGS) => {
    process.argv.forEach((arg) => {
        const [key, value] = arg.split('=');
        if (key && value) {
            ARGS[key.replace('--', '')] = value;
        }
    })
}
