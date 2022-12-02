import _ from 'lodash'

export function part1(input) {
    return _.chain(input)
        .reduce(({elves, elf}, caloriesStr) => {
            if (_.isEmpty(caloriesStr)) {
                return {
                    elves: [...elves, elf],
                    elf: []
                }
            }

            return {
                elves,
                elf: [...elf, parseInt(caloriesStr, 10)]
            }
        }, {
            elves: [],
            elf: [],
        })
        .thru(({elves, elf}) => [...elves, elf] )
        .map(elf => _.sum(elf))
        .max()
        .value();
}

export function part2(input) {

}
