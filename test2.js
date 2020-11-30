		const workSchedule = {
			mon: { opensAt: '08:00', closesAt: '17:45' },
			tue: 'closed',
			wed: { opensAt: '8:00', closesAt: '01:00' },
			thu: { opensAt: '8:00', closesAt: '02:00' },
			fri: { opensAt: '8:00', closesAt: '22:00' },
			sat: { opensAt: '12:00', closesAt: '02:00' },
			sun: 'closed'
		}

		/*var now = new Date();
		var opensTime = new Date();
		var closesTime = new Date();
		var dbOpensTime = new Date();
		var dbClosesTime = new Date();*/

		var timeString = '2020-11-26T01:30:00';

		function test() {
			opensTime = new Date(timeString);
			closesTime = new Date(timeString);
			dbClosesTime = new Date(timeString);
			dbOpensTime = new Date(timeString);
			now = new Date(timeString);
			console.log(`Test time now - ` + now);
			console.log(`Day - ` + now.getDay());
			return now.getDay();
			console.log(now.getDay());
		}
		
		switch (test()) {
			case 0: isOpen(workSchedule.sun, workSchedule.sat); break;
			case 1: isOpen(workSchedule.mon, workSchedule.sun); break;
			case 2: isOpen(workSchedule.tue, workSchedule.mon); break;
			case 3: isOpen(workSchedule.wed, workSchedule.tue); break;
			case 4: isOpen(workSchedule.thu, workSchedule.wed); break;
			case 5: isOpen(workSchedule.fri, workSchedule.thu); break;
			case 6: isOpen(workSchedule.sat, workSchedule.fri); break;
		}

		function isOpen(setCurrDay, setDayBefore) {
			if (setTime(setCurrDay, setDayBefore) == true)
				console.log(`Opened`);
			else
				console.log(`Closed`);
		}

		function setTime(currDay, dayBefore) {
			if (currDay != 'closed' || dayBefore !='closed') {
				var [opensTime = new Date(), closesTime = new Date()] = objToTime(currDay);
				var [dbOpensTime = new Date(), dbClosesTime = new Date()] = objToTime(dayBefore);
				dbClosesTime = new Date(dbClosesTime.getTime() - 1000 * 60 * 60 * 24); // ???
				if ((opensTime <= now && closesTime > now) || dbClosesTime > now) {
					return true;
				}
				else return false;
			} 
			else return false;
		}
		
		function objToTime(schDay) {
			if(schDay != 'closed') {
				var openString = schDay.opensAt.split(':');
				var closeString = schDay.closesAt.split(':');
				var tempOpensTime = new Date(timeString);
				var tempClosesTime = new Date(timeString);
				tempOpensTime.setHours(openString[0]);
				tempOpensTime.setMinutes(openString[1]);
				tempOpensTime.setSeconds(0);
				tempClosesTime.setHours(closeString[0]);
				tempClosesTime.setMinutes(closeString[1]);
				tempClosesTime.setSeconds(0);
				if(tempOpensTime > tempClosesTime) {
					tempClosesTime = new Date(tempClosesTime.getTime() + 1000 * 60 * 60 * 24);
					return [tempOpensTime, tempClosesTime];
				}
				else return [tempOpensTime, tempClosesTime];
			}
			else
				var longTimeAgo = new Date('1970-01-01T00:00:00.000');
				return [longTimeAgo, longTimeAgo];
		}