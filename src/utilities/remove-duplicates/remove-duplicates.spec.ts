import { removeDuplicates } from "./remove-duplicates";

describe('removeDuplicates', () => {
    it('should remove duplicates strings in array', () => {
        expect(removeDuplicates([
            '1',
            '1',
            '2',
            '3',
            '3',
            '3',
        ])).toStrictEqual([
            '1', '2', '3'
        ]);
    });
});
