INSERT INTO t_type (type_name) 
VALUES 
    ('Fiction'),
    ('Non-Fiction'),
    ('Science'),
    ('History'),
    ('Fantasy');

INSERT INTO t_book (bid, book_name, author, num, press, type_name, tid) 
VALUES 
    (1, 'To Kill a Mockingbird', 'Harper Lee', 10, 'J.B. Lippincott & Co.', 'Fiction', 1),
    (2, 'A Brief History of Time', 'Stephen Hawking', 8, 'Bantam Books', 'Science', 3),
    (3, 'Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 12, 'Harper', 'Non-Fiction', 2),
    (4, '1984', 'George Orwell', 7, 'Secker & Warburg', 'Fiction', 1),
    (5, 'The Hobbit', 'J.R.R. Tolkien', 5, 'George Allen & Unwin', 'Fantasy', 5);


INSERT INTO t_user (account, name, password, phone, times, lend_num, max_num, role)
VALUES 
    ('admin', 'Admin', 'AdminPass2025', '111-222-3333', 0, 0, 0, 2), 
    ('johndoe', 'John Doe', 'password123', '123-456-7890', 0, 10, 20, 1),         
    ('janesmith', 'Jane Smith', 'securePass!2023', '987-654-3210', 0, 5, 20, 1);     