// You just need to implement the removePassword function
function removePassword(user) {
    // Remove password property
    delete user.password;
    return user;
}
