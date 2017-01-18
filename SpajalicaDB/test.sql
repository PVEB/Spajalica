use spajalicadb;

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