import { generateComments } from "./generate-comments";

describe('generateComments', () => {
    it('should include an eslint-disable', () => {
        expect(generateComments()).toContain('/* eslint-disable */');
    });

    it('should include an tslint:disable', () => {
        expect(generateComments()).toContain('/* tslint:disable */');
    });
});
