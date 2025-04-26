// 1. How many users are active?
[
    {
        $match: {
            isActive: true,
        }
    },
    {
        $count: 'activeUsers'
    }
];

// Grouping in MongoDB:

// 2. What is the average age of all users?

[
    {
        $group: {
            _id: "$gender", // group based on gender
            averageAge: {
                $avg: "$age"
            }
        }
    }
];
[
    {
        $group: {
            _id: null, // group all the users
            averageAge: {
                $avg: "$age"
            }
        }
    }
];

// 3. List the top 5 most common favorite fruits among the users.
[
    {
        $group: {
            _id: "$favoriteFruit",
            count: {
                $sum: 1 // adds 1 to count or number of incrments
            }
        }
    },
    {
        $sort: {
            count: -1 // descending
        }
    },
    {
        $limit: 5
    }
];
[
    {
        $group: {
            _id: "$favoriteFruit",
            count: {
                $sum: 1 // adds 1 to count
            }
        }
    },
    {
        $sort: {
            count: 1 // ascending
        }
    },
    {
        $limit: 5 // limit the document to the given limit
    }
];

// Group Sum:

// 4. Find the total number of males and females
[
    {
        $group: {
            _id: "$gender",
            genderCount: {
                $sum: 1
            }
        }
    }
];

// 5. Which country has the highest number of registered users?
[
    {
        $group: {
            _id: "$company.location.country",
            userCount: {
                $sum: 1
            }
        }
    },
    {
        $sort: {
            userCount: -1
        }
    },
    {
        $limit: 2
    }
];

// 6. List all unique eye colors present in the collection
[
    {
        $group: {
            _id: "$eyeColor",
        }
    }
];

// Dealing with arrays:

// 7. What is the average number of tags per user?
// solution-1
[
    {
        $unwind: "$tags"
    },
    {
        $group: {
            _id: "$_id",
            numberOfTags: {
                $sum: 1,
            }
        }
    },
    {
        $group: {
            _id: null,
            averageNumberOfTags: {
                $avg: "$numberOfTags"
            }
        }
    }
];
// solution - 2
[
    {
        $addFields: {  // addFields adds a new field in the document
            numberOfTags: {
                $size: { $ifNull: ["$tags", []] }
            }
        }
    },
    {
        $group: {
            _id: null,
            averageNumberOfTags: {
                $avg: "$numberOfTags"
            }
        }
    }
];

// Match and Project Pipeline:

// 8. How many users have 'enim' as one of their tags?
[
    {
        $match: { // used to filter out the document
            tags: "enim"
        }
    },
    {
        $count: 'userWithEnimTag'
    }
];

// 9. What are the names and age of the users who are inactive and have 'velit' as a tag?
[
    {
        $match: {
            isActive: false,
            tags: "velit"
        }
    },
    {
        $project: { // projection
            name: 1,
            age: 1
        }
    }
];

// 10. How many users have a phone number starting with '+1 (940)'?
[
    {
        $match: {
            "company.phone": /^\+1 \(940\)/
        }
    },
    {
        $count: 'usersWithSpecialPhoneNumber'
    }
];

// Match all operators:

// 11. Who has registered the most recently?

[
    {
        $sort: {
            registered: -1
        }
    },
    {
        $limit: 4
    },
    {
        $project: {
            name: 1,
            age: 1,
            registered: 1,
            favoriteFruit: 1,
        }
    }
];

// 12. Categorize users by their favorite fruit

[
    {
        $group: {
            _id: "$favoriteFruit",
            users: {
                $push: "$name"
            }
        }
    }
];

// 13. How many users have 'ad' as the second tag in their list of tags?

[
    {
        $match: {
            "tags.1": "ad"
        }
    },
    {
        $count: 'secondTagAd'
    }
];

// 14. Find users who have both 'enim' and 'id' as their tags

[
    {
        $match: {
            tags: {
                $all: ["enim", "id"]
            }
        }
    }
];

// 15. List all companies located in the USA with their corresponding user count.

[
    {
        $match: {
            "company.location.country": "USA"
        }
    },
    {
        $group: {
            _id: "$company.title",
            userCount: {
                $sum: 1,
            }
        }
    }
];

// Lookup:
[
    {
        $lookup: {
            from: "authors",
            localField: "author_id",
            foreignField: "_id",
            as: "author_details"
        }
    },
    {
        $addFields: {
            author_details: {
                $first: "$author_details"
            }
        }
    }
];

[
    {
        $lookup: {
            from: "authors",
            localField: "author_id",
            foreignField: "_id",
            as: "author_details"
        }
    },
    {
        $addFields: {
            author_details: {
                $arrayElemAt: ["$author_details", 0]
            }
        }
    }
];