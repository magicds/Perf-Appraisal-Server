exports.resReturn = (data, code = 200, errMsg = '') => {
    return {
        data,
        code,
        errMsg
    }
}