import knex from './knex_db'; // Import the Knex instance

// Fetch a group by its join code
export const getGroupByJoinCode = async (joinCode: string) => {
    try {
        const group = await knex('groups').where({ join_code: joinCode }).first();
        return group;
    } catch (error) {
        console.error('Error fetching group by join code:', error);
        throw new Error('Could not fetch group');
    }
};

// Fetch a group by its ID
export const getGroupById = async (groupId: number) => {
    try {
        console.log('groupId:', groupId);
        const group = await knex('groups').where({ group_id: groupId }).first();
        return group;
    } catch (error) {
        console.error('Error fetching group by ID:', error);
        throw new Error('Could not fetch group');
    }
};

// Add a new group (optional for future dynamic functionality)
export const addGroup = async (name: string, sport: string, joinCode: string) => {
    try {
        const [groupId] = await knex('groups').insert(
        { name, sport, join_code: joinCode },
        ['group_id']
        );
        return groupId;
    } catch (error) {
        console.error('Error adding group:', error);
        throw new Error('Could not add group');
    }
};
