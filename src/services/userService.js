const baseUrl = "http://localhost:3005/api/users";

export async function getAll() {
    const response = await fetch(baseUrl);
    const result = await response.json();

    return result.users;
}

export async function getOne(userId) {
    const response = await fetch(`${baseUrl}/` + userId);
    const result = await response.json();

    return result.user;
}

export async function create(userData) {
    const { country, city, street, streetNumber, ...data } = userData;
    data.address = {
        country,
        city,
        street,
        streetNumber,
    };
    const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    return result.user;
}

export const deleteUser = async (userId) => {
    const response = await fetch(`${baseUrl}/` + userId, { method: "DELETE" });

    const result = await response.json();
    return result;
};
