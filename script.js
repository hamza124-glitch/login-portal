<script>
        const API_KEY = 'AIzaSyBQy-IDtj9ayNwLGcR2P9NJAYrdwlcPJCk'; // Your API Key
        const SPREADSHEET_ID = '1PxMMRlODjwjIneraH0ayXEtjo-rjGA-fk4K0qF7XSno'; // Your Spreadsheet ID

        // Mapping of passwords to sheet names
        const passwordSheetMap = {
            '1274': 'User 1',
            '2068': 'User 2',
            '3849': 'User 3',
            '4513': 'User 4',
            '5237': 'User 5',
            '6391': 'User 6',
            '7815': 'User 7',
            '8224': 'User 8',
            '9542': 'User 9',
            '1013': 'User 10',
            '11046': 'User 11',
            '12048': 'User 12',
            '13090': 'User 13',
            '14059': 'User 14',
            '15036': 'User 15'
        };

        async function fetchData(sheetName) {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheetName}!A2:L?key=${API_KEY}`;
            const response = await fetch(url);

            if (!response.ok) {
                const errorMessage = await response.text();
                document.getElementById('data').innerHTML = `<p>Error: ${errorMessage}</p>`;
                return;
            }

            const data = await response.json();
            displayData(data.values);
        }

        function displayData(values) {
            const dataContainer = document.getElementById('data');
            dataContainer.innerHTML = ''; // Clear previous data

            if (!values || values.length === 0) {
                dataContainer.innerHTML = '<p>No data found.</p>';
                return;
            }

            // Get data for cards
            const [firstRow] = values; // Get the first row of data
            const k2Data = firstRow[10] || 'N/A'; // K2 data (11th element, index 10)
            const j2Data = firstRow[9] || 'N/A';  // J2 data (10th element, index 9)
            const l2Data = firstRow[11] || 'N/A'; // L2 data (12th element, index 11)

            // Populate cards with data
            document.getElementById('k2-data').textContent = k2Data;
            document.getElementById('j2-data').textContent = j2Data;
            document.getElementById('l2-data').textContent = l2Data;

            // Build the table
            const tableHeader = `
                <div class="table-header">
                    <div class="header-cell">Track ID</div>
                    <div class="header-cell">Title</div>
                    <div class="header-cell">Artist</div>
                    <div class="header-cell">Album</div>
                    <div class="header-cell">Record Label</div>
                    <div class="header-cell">Songwriter</div>
                    <div class="header-cell">Release Date</div>
                    <div class="header-cell">Status</div>
                </div>
            `;
            dataContainer.innerHTML = tableHeader;

            // Loop through rows and filter out rows with "N/A"
            values.forEach(row => {
            // Check if the row contains "N/A" in any column you want to filter
                if (row.some(cell => cell === '#N/A')) {
                    return; // Skip this row
            }

            // Create a table row with valid data
                const tableRow = `
                    <div class="table-row">
                        <div class="table-cell"><span class="table-cell-highlight">${row[0] || 'N/A'}</span></div>
                        <div class="table-cell">${row[1] || 'N/A'}</div>
                        <div class="table-cell">${row[2] || 'N/A'}</div>
                        <div class="table-cell">${row[3] || 'N/A'}</div>
                        <div class="table-cell">${row[4] || 'N/A'}</div>
                        <div class="table-cell">${row[5] || 'N/A'}</div>
                        <div class="table-cell">${row[6] || 'N/A'}</div>
                        <div class="table-cell"><span class="${row[7] === 'Removed' ? 'red' : row[7] === 'In Review' ? 'blue' : row[7] === 'In Progress' ? 'yellow' : row[7] === 'Copyrighted' ? 'green' : ''}">${row[7] || 'N/A'}</span></div>
                `;
                dataContainer.innerHTML += tableRow;
            });

            // Show cards and table
            document.getElementById('card-container').style.display = 'flex';
            document.querySelector('.fillout-container').style.display = 'flex';
            dataContainer.style.display = 'block';
            
        }
        
        function checkPassword() {
            const password = document.getElementById('passwordInput').value;
            const sheetName = passwordSheetMap[password];

            if (sheetName) {
                fetchData(sheetName);
                document.getElementById('login-container').style.display = 'none';
            } else {
                alert('Invalid password. Please try again.');
            }
        }
        
    </script>
