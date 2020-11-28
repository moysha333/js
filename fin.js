		const workSchedule = {
			mon: { opensAt: '08:00', closesAt: '17:45' },
			tue: 'closed',
			wed: { opensAt: '8:00', closesAt: '22:00' },
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

		function test() {
			var timeString = '2020-11-29T01:59:00';
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
			if(currDay != 'closed' && dayBefore == 'closed') {
				objectToTime(currDay, opensTime, closesTime);
				if((opensTime > closesTime && now >= opensTime) || (opensTime <= now && closesTime > now)) {
					return true;
				}
				else return false;
			}
			else if (currDay == 'closed' && dayBefore != 'closed') {
				objectToTime(dayBefore, dbOpensTime, dbClosesTime);
				if(dbOpensTime > dbClosesTime && dbClosesTime > now) {
					return true;
				}
				else return false;
			}
			else if(currDay != 'closed' && dayBefore != 'closed') {
				objectToTime(currDay, opensTime, closesTime);
				objectToTime(dayBefore, dbOpensTime, dbClosesTime);
				if ((opensTime > closesTime && dbOpensTime < dbClosesTime && now >= opensTime) || (opensTime < closesTime && dbOpensTime > dbClosesTime && ((opensTime <= now && now < closesTime) || now < dbClosesTime)) || (opensTime > closesTime && dbOpensTime > dbClosesTime && (now >= opensTime || now < dbClosesTime))) {
					return true;
				}
				else return false;
			}
			else return false;
		}

		function objectToTime(tempDay, timeVarOpens, timeVarCloses) {
			var openString = tempDay.opensAt.split(':');
			var closeString = tempDay.closesAt.split(':');
			timeVarOpens.setHours(openString[0]);
			timeVarOpens.setMinutes(openString[1]);
			timeVarOpens.setSeconds(0);
			timeVarCloses.setHours(closeString[0]);
			timeVarCloses.setMinutes(closeString[1]);
			timeVarCloses.setSeconds(0);
		}