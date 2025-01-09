-- Table: t_book
CREATE TABLE t_book (
    bid INT PRIMARY KEY,                
    book_name VARCHAR(255) NOT NULL,    
    author VARCHAR(255),                
    num INT,                            
    press VARCHAR(255),                
    type_name VARCHAR(255),            
    tid INT,                            
    times INT DEFAULT 0  
);

-- Table: t_history
CREATE TABLE t_history (
    hid INT PRIMARY KEY IDENTITY(1,1), 
    uid INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    account VARCHAR(255) NOT NULL,
    bid INT NOT NULL,
    book_name VARCHAR(255) NOT NULL,
    begin_time DATE NOT NULL,
    end_time DATE,
    status INT NOT NULL
);

-- Table: t_type
CREATE TABLE t_type (
    tid INT PRIMARY KEY IDENTITY(1,1), 
    type_name VARCHAR(255) NOT NULL
);

-- Table: t_user
CREATE TABLE t_user (
    uid INT PRIMARY KEY IDENTITY(1,1),  
    account VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    times INT DEFAULT 0,           
    lend_num INT DEFAULT 0,
    max_num INT DEFAULT 0,
    role INT NOT NULL
);
