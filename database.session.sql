-- @block
DROP TABLE Brukere;

-- @block
CREATE TABLE Brukere (
    bruker_id INT NOT NULL AUTO_INCREMENT,
    Brukernavn VARCHAR(50) NOT NULL UNIQUE,
    Passord VARCHAR(200) NOT NULL,
    PRIMARY KEY (bruker_id),
    Highscore smallINT NOT NULL DEFAULT 0
);

-- @block
INSERT INTO Brukere 
(
    Brukernavn,
    Passord
)
VALUES
(
    'lukas',
    'alvar',
    'skarsk',
    'preben'
);


-- @block
SELECT * from Brukere;