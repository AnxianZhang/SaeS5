const isAllUnder64Character = list => {
    return Object.values(list).filter(inputValue => inputValue.length <= 50).length === Object.values(list).length
}

module.exports =  {
    isAllUnder64Character,
}