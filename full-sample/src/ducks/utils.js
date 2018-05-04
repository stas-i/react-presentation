import {OrderedMap} from 'immutable';

export function dataToEntities(valuesArray, DataRecord) {
    return valuesArray
        .reduce(
            (acc, value) => acc.set(value.id, new DataRecord(value)),
            new OrderedMap({})
        );
}