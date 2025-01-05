import knex from './knex_db';

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

/**
 * Get the leaderboard for a group.
 * @param groupId - The ID of the group.
 * @returns Array of users with their match statistics, sorted by wins in descending order.
 */
export const getGroupLeaderboard = async (groupId: number) => {
    try {
        const leaderboard = await knex('matches')
            .select(
                'users.id as user_id',
                'users.name',
                knex.raw('COUNT(CASE WHEN matches.winner_id = users.id THEN 1 END) as wins'),
                knex.raw('COUNT(CASE WHEN matches.loser_id = users.id THEN 1 END) as losses'),
                knex.raw('COUNT(*) as total_matches')
            )
            .join('users', function () {
                this.on('matches.winner_id', '=', 'users.id')
                    .orOn('matches.loser_id', '=', 'users.id');
            })
            .where('matches.group_id', groupId)
            .groupBy('users.id', 'users.name')
            .orderBy('wins', 'desc');

        return leaderboard;
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        throw new Error('Could not fetch leaderboard');
    }
};