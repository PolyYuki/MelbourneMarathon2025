document.addEventListener('DOMContentLoaded', function() {

    // --- カウントダウンタイマー ---
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const marathonDate = new Date('2025-10-12T06:30:00').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = marathonDate - now;

            if (distance < 0) {
                countdownElement.innerHTML = '<h2 class="display-5">大会は終了しました！</h2>';
                clearInterval(interval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `
                <h2 class="display-5">大会開催まで</h2>
                <div class="d-flex justify-content-center gap-3 fs-4">
                    <div><strong>${days}</strong>日</div>
                    <div><strong>${hours}</strong>時間</div>
                    <div><strong>${minutes}</strong>分</div>
                    <div><strong>${seconds}</strong>秒</div>
                </div>
            `;
        };

        const interval = setInterval(updateCountdown, 1000);
        updateCountdown(); // 初期表示
    }

    // --- 参加者一覧表示 ---
    const participantListElement = document.getElementById('participant-list');
    if (participantListElement && typeof participants !== 'undefined') {
        // 参加者がいない場合のメッセージ
        if (participants.length === 0) {
            const noParticipantMessage = document.createElement('div');
            noParticipantMessage.className = 'col-12 text-center';
            noParticipantMessage.innerHTML = '<p class="lead">現在、登録されている参加者はいません。</p>';
            participantListElement.appendChild(noParticipantMessage);
            return;
        }

        participants.forEach(p => {
            const col = document.createElement('div');
            col.className = 'col-md-3 col-sm-4';

            const card = document.createElement('div');
            card.className = 'card h-100 participant-card';

            const raceColor = getRaceColor(p.race);

            card.innerHTML = `
                <img src="${p.photo ? p.photo : 'https://via.placeholder.com/300x200.png?text=No+Image'}" class="card-img-top" alt="${p.nickname}">
                <div class="card-body">
                    <div>
                        <h5 class="card-title">${p.nickname}</h5>
                        <p class="card-text">${p.comment}</p>
                    </div>
                    <div class="mt-auto">
                         ${getRaceLink(p.race, raceColor)}
                    </div>
                </div>
            `;
            col.appendChild(card);
            participantListElement.appendChild(col);
        });
    }

    function getRaceColor(race) {
        switch (race) {
            case 'フルマラソン':
                return 'primary';
            case 'ハーフマラソン':
                return 'success';
            case '10km':
                return 'info';
            case '応援':
                return 'warning';
            default:
                return 'secondary';
        }
    }

    function getRaceLink(race, color) {
        let url = "#";
        if (race === 'フルマラソン') {
            url = "https://melbournemarathon.com.au/marathon/";
        } else if (race === '10km') {
            url = "https://melbournemarathon.com.au/10km-run/";
        }

        if (url !== "#") {
            return `<a href="${url}" target="_blank" class="badge bg-${color} text-decoration-none">${race}</a>`;
        } else {
            return `<span class="badge bg-${color}">${race}</span>`;
        }
    }
});
