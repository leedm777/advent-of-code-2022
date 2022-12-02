import _ from 'lodash'

function toElves(input) {
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
}

export function part1(input) {
    return toElves(input)
        .max()
        .value();
}

export function part2(input) {
    return toElves(input)
        .sortBy(x => -x)
        .take(3)
        .sum()
        .value()
}
