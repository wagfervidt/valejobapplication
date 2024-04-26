const axios = require('axios');
const querystring = require('querystring');

module.exports = srv => {
    srv.on('READ', 'JobRequisitionIntegrity', async (request, next) => {
        async function obterTokenAcesso() {
            const urlIdp = 'https://api4.successfactors.com/oauth/idp';
            const dataIdp = querystring.stringify({
                client_id: 'ZmQ3ZGU4NjQwOTY4NTQ2N2M4N2VhMTY1MWViMQ',
                user_id: 'adminmmc',
                token_url: 'https://api4.successfactors.com/oauth/token',
                private_key: 'TUlJRXZ3SUJBREFOQmdrcWhraUc5dzBCQVFFRkFBU0NCS2t3Z2dTbEFnRUFBb0lCQVFDSnJYMjZLclNCTmJaMElSVk9UeU5LT3h2VllneXV0NjdiQXNaalhHVGdESEYrWDJkUDl2TTRHVHJ0L2s2T0dKL0ljdFVJUkk4Mm92MWRuMmMwLzJYQVNYaCtGaFY0eHY5cGo4RWNNNFJ1c3JrR2RvVDdoNk9LYyttQW05NUtKcWdBSWZmMGFXVUhzVFI3NzF3NU91dkJhVXN5WjQ5ejVOTGZLem1TZmx4QnlTNTVyRVVlK0lhTG1mcllZeUVvOFFVRC9aL0FLT3FVWVZQbmZRUmQzbzVnY1lXWE0rUnkvQ1M3dXBXRXc5OE91czZOelFEb2ZZKys1Rk0zK05GeDlTbCs0azJQUFpsZTZRVElhL3M5UXN1K1RCMDFGUnl3T01IUTBhSVB6SEZBZ1VGQjllRGFUOE85WGtCdDdiRTRuZzZyeXlnSnFvbFBIOHNieEhoYm5XUTdBZ01CQUFFQ2dnRUFSOWlaZThVOVhSQkNubWVGVHRCTmdqZEdWeHhMc2dGNDVpR1VsZFZwYnVJUGQvc2hWc0Z3T3g0dmVuTHpXNFBPSGpTT3B6bmY0b3M3M05lS2JFVzdPNVViby9DeVU4ekZETGxQOVArTlpKY3Zwd2ZDYmVCaW42WE5mS2ZhWUtlN2xCWWw1dzM1QXdLZWVPNTRHZ1Y5Y2ZrWW5MMGVSMFJxSnJ2UDEzckplaXBTcmVHV2RXRlkrSEs2R3FGSExRYjlwZ2s0dXRVcUpkdm4vc1YwdnZPY05sSXpDZzBtbGNGdy9qZUF1dzFuZnJSMEdENXlHL2duclhCRFM1QWxNOVB2ZmZTNnZZU2ZsTUk0YmIzRnFpMHdvMkZKWnlMdEpWblN4emZCdlpqWEx2MXdMK1JjWE43VFVaM3djQUFKbnVmS1NpZ0JWS0Y0LzArck8zMWVOd2lxUVFLQmdRRGtsMTZBZmUvdTkzd1JpUUZZNVhpOXVhN2dQTDkzVGc2aXltZHVpRndDaXMvRmxNNnpNQ3hOWGoxeXNac0xiYkR1VXg4Si80VUlkaFpLYUh5RUpod3ZHbXZ0Ym1ydjhTNnZ1cFdXTmplY1VQWi9aWERRY3pXRGpQdFJRMlk2N1F2Yk5kWHM3dDV5VEY4cWp5QjBUQUZRNXdNaHF4cndOaW8xZ2pScnB4SEVWUUtCZ1FDYUw0VmQ3L1g3Rnp1bmRXSGpkcEJVMkpraHo1bFJ4d2EzWVp3T1o4MHlXdExZRE83ckxSTDZ3alZZR2dQY0dnaGJuTzI0NmJ0NjkyeVpaajdMMi9vL2l3NHNmZ0Z6dzFqZEc4MisrT1BTTDFkUk42K2t2azdRalN6SGtQblpGdUhhWERiYkxjVHAxeVhCSnJlNlU4ZTZkZVh3dDRheGRzcUNhZVFzSzdpV1R3S0JnUURaM0w1dm5oZVgzSDE5eE9MbzA4T1FwekRaZkd4TEM3VDlTQVR1SHIzNm1rdk5scmF0cHlNQ0ZlaGdzSThCaEdqVnE1andrWHc4QlRmWGNPQURuc0xMemRYQk03UnR2S0x2VHRnVWt0WExnSXA5L3JOWHFBWC91OVVtclNMNDFFV3hoZ3krUlNiekxvQ2c4a3BQTE1Vd1V3djBBYnlwNWlXeVc4Y1VOdVhEQlFLQmdRQ1pOWk5PcnIwOGplK0hEUXNDSGJSNXV1a2ZRY3hXQ0hEU0ZEb2Z6bUdHSWQzVk5iVExGL1QrRzdFcUpGK2xmSERGcUFCSWVHa0ZYWXNhT3hFM1BSVkR3d2VJaW9VaTVRQU9aaXhpRWF0QUZpNnIwNnZEQmlBRzkrR0JSTHdnVGE2TGJvcEw3UVQ0WUFOeUZPa0lTMnZ5Q21rOGN3RnlvbG5Fa1RoYjgrM3QzUUtCZ1FEQU9PQlZrWE40bUx2MmhXd0t5cEVYYnEyTnFoMGcyWkYwRGZzc1BITjU2UTE5U1FMM3MzV1dqUEFiSXVaY3JrWkV4OFpTVkRjUkd5cW1EN2pjTTM4U1ZTWldIQWExdzA2cU5MaE1CUUNLZjU0ejFDMDVSRVdOT2ZBYnZGa3dRbzhYSFBqbVl0ZnR1SDJzanpocUZtRVB6ekxNV0cwT2hlOXJRQzNIcVpCYmd3PT0jIyN2YWxlRA'
            });

            try {
                const responseIdp = await axios.post(urlIdp, dataIdp, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                if (responseIdp.data) {
                    const urlToken = 'https://api4.successfactors.com/oauth/token';
                    const dataToken = querystring.stringify({
                        client_id: 'ZmQ3ZGU4NjQwOTY4NTQ2N2M4N2VhMTY1MWViMQ',
                        grant_type: 'urn:ietf:params:oauth:grant-type:saml2-bearer',
                        company_id: 'valeD',
                        assertion: responseIdp.data
                    });

                    const responseToken = await axios.post(urlToken, dataToken, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                    return responseToken.data.access_token;
                } else {
                    return null;
                }
            } catch (error) {
                console.error('Erro ao obter o token de acesso:', error.response ? error.response.data : error.message);
                return null;
            }
        }

        try {
            const token = await obterTokenAcesso();
            if (token) {
                let = urlJobApplication = '';
                let integrityID = '';
                if (request.params.length > 0) {
                    integrityID = request.params[0].integrityID;
                }
                if (integrityID) {
                    urlJobApplication = `https://api4.successfactors.com/odata/v2/JobApplication?$expand=jobRequisition/recruiter&$format=json&$filter=applicationId eq '${integrityID}'`;
                } else {
                    urlJobApplication = 'https://api4.successfactors.com/odata/v2/JobApplication?$expand=jobRequisition/recruiter&$format=json';
                }
                const optionsJobApplication = {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                const jobApplicationData = await axios.get(urlJobApplication, optionsJobApplication);
                const applications = jobApplicationData.data.d.results;

                const formattedDataArray = applications.map(application => {
                    let recruiter = application.jobRequisition && application.jobRequisition.recruiter.results[0];
                    return {
                        integrityID: application.applicationId,
                        candidateFirstName: application.firstName,
                        candidateLastName: application.lastName,
                        recruiterFirstName: recruiter ? recruiter.firstName : '',
                        recruiterLastName: recruiter ? recruiter.lastName : '',
                        jobCode: application.jobRequisition.jobCode,
                        jobTitle: application.jobRequisition.position_job_title,
                        jobReqId: application.jobRequisition.jobReqId
                    };
                });

                return formattedDataArray;
            } else {
                console.log("Token não recebido.");
                return [];
            }
        } catch (error) {
            console.error('Erro geral:', error.message);
            return [];
        }
    });

    srv.on('READ', 'PublicRelative', async (request, next) => {
        async function obterTokenAcesso() {
            const urlIdp = 'https://api4.successfactors.com/oauth/idp';
            const dataIdp = querystring.stringify({
                client_id: 'ZmQ3ZGU4NjQwOTY4NTQ2N2M4N2VhMTY1MWViMQ',
                user_id: 'adminmmc',
                token_url: 'https://api4.successfactors.com/oauth/token',
                private_key: 'TUlJRXZ3SUJBREFOQmdrcWhraUc5dzBCQVFFRkFBU0NCS2t3Z2dTbEFnRUFBb0lCQVFDSnJYMjZLclNCTmJaMElSVk9UeU5LT3h2VllneXV0NjdiQXNaalhHVGdESEYrWDJkUDl2TTRHVHJ0L2s2T0dKL0ljdFVJUkk4Mm92MWRuMmMwLzJYQVNYaCtGaFY0eHY5cGo4RWNNNFJ1c3JrR2RvVDdoNk9LYyttQW05NUtKcWdBSWZmMGFXVUhzVFI3NzF3NU91dkJhVXN5WjQ5ejVOTGZLem1TZmx4QnlTNTVyRVVlK0lhTG1mcllZeUVvOFFVRC9aL0FLT3FVWVZQbmZRUmQzbzVnY1lXWE0rUnkvQ1M3dXBXRXc5OE91czZOelFEb2ZZKys1Rk0zK05GeDlTbCs0azJQUFpsZTZRVElhL3M5UXN1K1RCMDFGUnl3T01IUTBhSVB6SEZBZ1VGQjllRGFUOE85WGtCdDdiRTRuZzZyeXlnSnFvbFBIOHNieEhoYm5XUTdBZ01CQUFFQ2dnRUFSOWlaZThVOVhSQkNubWVGVHRCTmdqZEdWeHhMc2dGNDVpR1VsZFZwYnVJUGQvc2hWc0Z3T3g0dmVuTHpXNFBPSGpTT3B6bmY0b3M3M05lS2JFVzdPNVViby9DeVU4ekZETGxQOVArTlpKY3Zwd2ZDYmVCaW42WE5mS2ZhWUtlN2xCWWw1dzM1QXdLZWVPNTRHZ1Y5Y2ZrWW5MMGVSMFJxSnJ2UDEzckplaXBTcmVHV2RXRlkrSEs2R3FGSExRYjlwZ2s0dXRVcUpkdm4vc1YwdnZPY05sSXpDZzBtbGNGdy9qZUF1dzFuZnJSMEdENXlHL2duclhCRFM1QWxNOVB2ZmZTNnZZU2ZsTUk0YmIzRnFpMHdvMkZKWnlMdEpWblN4emZCdlpqWEx2MXdMK1JjWE43VFVaM3djQUFKbnVmS1NpZ0JWS0Y0LzArck8zMWVOd2lxUVFLQmdRRGtsMTZBZmUvdTkzd1JpUUZZNVhpOXVhN2dQTDkzVGc2aXltZHVpRndDaXMvRmxNNnpNQ3hOWGoxeXNac0xiYkR1VXg4Si80VUlkaFpLYUh5RUpod3ZHbXZ0Ym1ydjhTNnZ1cFdXTmplY1VQWi9aWERRY3pXRGpQdFJRMlk2N1F2Yk5kWHM3dDV5VEY4cWp5QjBUQUZRNXdNaHF4cndOaW8xZ2pScnB4SEVWUUtCZ1FDYUw0VmQ3L1g3Rnp1bmRXSGpkcEJVMkpraHo1bFJ4d2EzWVp3T1o4MHlXdExZRE83ckxSTDZ3alZZR2dQY0dnaGJuTzI0NmJ0NjkyeVpaajdMMi9vL2l3NHNmZ0Z6dzFqZEc4MisrT1BTTDFkUk42K2t2azdRalN6SGtQblpGdUhhWERiYkxjVHAxeVhCSnJlNlU4ZTZkZVh3dDRheGRzcUNhZVFzSzdpV1R3S0JnUURaM0w1dm5oZVgzSDE5eE9MbzA4T1FwekRaZkd4TEM3VDlTQVR1SHIzNm1rdk5scmF0cHlNQ0ZlaGdzSThCaEdqVnE1andrWHc4QlRmWGNPQURuc0xMemRYQk03UnR2S0x2VHRnVWt0WExnSXA5L3JOWHFBWC91OVVtclNMNDFFV3hoZ3krUlNiekxvQ2c4a3BQTE1Vd1V3djBBYnlwNWlXeVc4Y1VOdVhEQlFLQmdRQ1pOWk5PcnIwOGplK0hEUXNDSGJSNXV1a2ZRY3hXQ0hEU0ZEb2Z6bUdHSWQzVk5iVExGL1QrRzdFcUpGK2xmSERGcUFCSWVHa0ZYWXNhT3hFM1BSVkR3d2VJaW9VaTVRQU9aaXhpRWF0QUZpNnIwNnZEQmlBRzkrR0JSTHdnVGE2TGJvcEw3UVQ0WUFOeUZPa0lTMnZ5Q21rOGN3RnlvbG5Fa1RoYjgrM3QzUUtCZ1FEQU9PQlZrWE40bUx2MmhXd0t5cEVYYnEyTnFoMGcyWkYwRGZzc1BITjU2UTE5U1FMM3MzV1dqUEFiSXVaY3JrWkV4OFpTVkRjUkd5cW1EN2pjTTM4U1ZTWldIQWExdzA2cU5MaE1CUUNLZjU0ejFDMDVSRVdOT2ZBYnZGa3dRbzhYSFBqbVl0ZnR1SDJzanpocUZtRVB6ekxNV0cwT2hlOXJRQzNIcVpCYmd3PT0jIyN2YWxlRA'
            });

            try {
                const responseIdp = await axios.post(urlIdp, dataIdp, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                if (responseIdp.data) {
                    const urlToken = 'https://api4.successfactors.com/oauth/token';
                    const dataToken = querystring.stringify({
                        client_id: 'ZmQ3ZGU4NjQwOTY4NTQ2N2M4N2VhMTY1MWViMQ',
                        grant_type: 'urn:ietf:params:oauth:grant-type:saml2-bearer',
                        company_id: 'valeD',
                        assertion: responseIdp.data
                    });

                    const responseToken = await axios.post(urlToken, dataToken, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });

                    return responseToken.data.access_token;
                } else {
                    return null;
                }
            } catch (error) {
                console.error('Erro ao obter o token de acesso:', error.response ? error.response.data : error.message);
                return null;
            }
        }

        try {
            const token = await obterTokenAcesso();
            if (token) {
                let dat = _;
                let = urlJobApplication = '';
                let integrityID = '';
                if (request.params.length > 0) {
                    integrityID = request.params[0].integrityID;
                }
                if (integrityID) {
                    urlJobApplication = `https://api4.successfactors.com/odata/v2/JobApplication?$format=json&$filter=applicationId eq '${integrityID}'`;
                } else {
                    urlJobApplication = 'https://api4.successfactors.com/odata/v2/JobApplication?$format=json';
                }
                const optionsJobApplication = {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                const jobApplicationData = await axios.get(urlJobApplication, optionsJobApplication);
                const applications = jobApplicationData.data.d.results;

                const formattedDataArray = applications.map(application => {

                    return {
                        integrityID: application.applicationId,
                        firstName: application.firstName,
                        lastName: application.lastName,
                        firstName1: application.custom_parentePublico1,
                        kinshipDegree1: application.custom_parenteVale1,
                        region1: application.custom_localPublico1,
                        city1: application.custom_localPublico1,
                        firstName2: application.custom_parentePublico2,
                        kinshipDegree2: application.custom_parenteVale1,
                        region2: application.custom_localPublico2,
                        city2: application.custom_localPublico2,
                        firstName3: application.custom_parentePublico3,
                        kinshipDegree3: application.custom_parenteVale1,
                        region3: application.custom_localPublico3,
                        city3: application.custom_localPublico3
                    };
                });

                return formattedDataArray;
            } else {
                console.log("Token não recebido.");
                return [];
            }
        } catch (error) {
            console.error('Erro geral:', error.message);
            return [];
        }
    })

}