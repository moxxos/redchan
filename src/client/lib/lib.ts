function get_weekday(day: number): string {
    switch (day) {
        case 0:
            return 'Sun';
        case 1:
            return 'Mon';
        case 2:
            return 'Tue';
        case 3:
            return 'Wed';
        case 4:
            return 'Thu';
        case 5:
            return 'Fri';
        case 6:
            return 'Sat';
        default:
            throw new Error('date day is not 0-6')
    }
}

export function get_date_str(date: string) {
    let temp_date = new Date(date)

    return temp_date.toLocaleString().replace(',', ' (' + get_weekday(temp_date.getDay()) + ')')
}

