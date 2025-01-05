--
-- Database: `SimpleAdventure`
--
use SimpleAdventure;

-- --------------------------------------------------------

--
-- Table structure for table `player`
--
CREATE TABLE `player`
(
    `player_id`       int(11) NOT NULL,
    `player_login`    varchar(30) COLLATE utf8_polish_ci NOT NULL,
    `player_password` varchar(30) COLLATE utf8_polish_ci NOT NULL,
    `player_status`   tinyint(4) NOT NULL DEFAULT 1,
    `player_email`    varchar(50) COLLATE utf8_polish_ci NOT NULL,
    `created_at`      timestamp                          NOT NULL DEFAULT current_timestamp(),
    `updated_at`      timestamp                          NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp ()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `player`
--

INSERT INTO `player` (`player_id`, `player_login`, `player_password`, `player_status`, `player_email`, `created_at`,
                      `updated_at`)
VALUES (1, 'Adsel', 'adsel', 1, 'konto.pomocnicze12@gmail.com', '2023-10-19 15:08:38', '2023-10-19 15:08:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `player`
--
ALTER TABLE `player`
    ADD PRIMARY KEY (`player_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `player`
--
ALTER TABLE `player`
    MODIFY `player_id` int (11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;
