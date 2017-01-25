use spajalicadb;

SELECT 
    l.userName, u.statusMessage, u.statusTime, u.statusLocation
FROM
    userstatusupdates u
        JOIN
    logininfo l ON l.idloginInfo = u.idloginInfo
WHERE
    l.idloginInfo <> 2;

SELECT li.userName
FROM loginInfo li
WHERE li.idloginInfo <> 1
      AND NOT EXISTS(SELECT ub.idloginInfo, ub.idBlocked
					 FROM userBlocks ub
					 WHERE ub.idloginInfo = 1 AND ub.idBlocked = li.idloginInfo OR 
						   ub.idloginInfo = li.idloginInfo AND ub.idBlocked = 1)
      AND NOT EXISTS(SELECT uf.idloginInfo, uf.idFollowed
					 FROM userFollows uf
					 WHERE uf.idloginInfo = 1 AND uf.idFollowed = li.idloginInfo)		
ORDER BY li.userName;

use spajalicadb;
select pt.preferenceName 
from preferenceTags pt join userProfileTags upt 
	on pt.idPreferenceTags = upt.idPreferenceTags
						join loginInfo li
	on upt.idLoginInfo = li.idLoginInfo
where li.userName = 'test';

select idPreferenceTags from preferenceTags
where preferenceName = 'plavuse'

use spajalicadb;
select pt.preferenceName, upt.value
from preferenceTags pt join userPrefTag upt
on pt.idPreferenceTags = upt.idPreferenceTags 
						join loginInfo li on li.idloginInfo = upt.idloginInfo
where li.userName = 'test';


use spajalicadb;  
select li.userName 
from loginInfo li
where userName <> 'test'
		and exists (select *
					from userFollows uf
					where uf.idloginInfo = li.idloginInfo and uf.idFollowed = 1
						or uf.idloginInfo = 1 and uf.idFollowed = li.idloginInfo)
		and not exists (select *
						from userBlocks ub
                        where ub.idloginInfo = li.idloginInfo and ub.idBlocked = 1)
		and not exists (select *
						from userBlocks ub
                        where ub.idloginInfo = 1 and ub.idBlocked = li.idloginInfo);

SELECT li.userName, ui.firstName, ui.lastName, ui.birthDate, ui.joinedDate, ui.sex, ui.location, ui.profilePicture, ui.relationshipStatus
FROM loginInfo li join usersInfo ui 
on ui.idloginInfo = li.idloginInfo





