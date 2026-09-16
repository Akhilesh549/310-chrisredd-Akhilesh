/**
 * Verifies the publisher data-access helper against an in-memory database.
 */
import { describe, expect, it } from 'vitest';
import { publishers } from '../../db/schema';
import { createTestDatabase } from '../../db/test-helpers';
import { getAllPublishers } from './publishers';

describe('publisher data-access helpers', () => {
    it('returns publishers ordered alphabetically by name', async () => {
        const db = await createTestDatabase();
        await db.insert(publishers).values([
            { name: 'Zebra Works', description: 'z' },
            { name: 'Arcade Labs', description: 'a' },
        ]);

        const all = await getAllPublishers(db);

        expect(all.map((publisher) => publisher.name)).toEqual([
            'Arcade Labs',
            'Zebra Works',
        ]);
    });

    it('returns an empty list when no publishers exist', async () => {
        const db = await createTestDatabase();

        expect(await getAllPublishers(db)).toEqual([]);
    });
});
