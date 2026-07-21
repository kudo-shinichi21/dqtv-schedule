import { useState } from "react";
import dayjs from "dayjs";

const members = [
  "Tuấn Khôi",
  "Kiến Hoa",
  "Văn Tài",
  "Hoàng Sơn",
  "Tuấn Phát",
  "Đăng Khoa",
];

const START_DATE = "2026-07-05";

const START_ASSIGNMENT = {
  shift1822: "Tuấn Khôi",
  shift2224: "Hoàng Sơn",
  shift220630: "Tuấn Phát",
};

function nextPerson(person, step = 1) {
  const index = members.indexOf(person);

  return members[
    (index + step) % members.length
  ];
}

function generateMasterSchedule() {
  const schedules = [];

  let currentDate = dayjs(START_DATE);

  let shift1822 =
    START_ASSIGNMENT.shift1822;

  let shift2224 =
    START_ASSIGNMENT.shift2224;

  let shift220630 =
    START_ASSIGNMENT.shift220630;

  while (currentDate.year() <= 2027) {
    schedules.push({
      date: currentDate.format(
        "DD/MM/YYYY"
      ),
      shift1822,
      shift2224,
      shift220630,
    });

    currentDate = currentDate.add(
      4,
      "day"
    );

    shift1822 = nextPerson(
      shift1822
    );

    shift2224 = nextPerson(
      shift2224
    );

    shift220630 = nextPerson(
      shift220630
    );
  }

  return schedules;
}

function getPersonSchedule(
  personName,
  masterSchedule
) {
  const result = [];

  masterSchedule.forEach((item) => {
    if (
      item.shift1822 === personName
    ) {
      result.push({
        date: item.date,
        shift: "18h - 22h",
      });
    }

    if (
      item.shift2224 === personName
    ) {
      result.push({
        date: item.date,
        shift: "22h - 24h",
      });
    }

    if (
      item.shift220630 === personName
    ) {
      result.push({
        date: item.date,
        shift: "22h - 06h30",
      });
    }
  });

  return result;
}

export default function App() {
  const [tab, setTab] =
    useState("person");

  const [selectedPerson, setSelectedPerson] =
    useState(members[0]);

  const [selectedDate, setSelectedDate] =
    useState(dayjs(
      START_DATE
    ).format("YYYY-MM-DD"));

  const masterSchedule =
    generateMasterSchedule();

  const personSchedule =
    getPersonSchedule(
      selectedPerson,
      masterSchedule
    );

  const selectedDay =
    masterSchedule.find(
      (item) =>
        dayjs(
          item.date,
          "DD/MM/YYYY"
        ).format(
          "YYYY-MM-DD"
        ) === selectedDate
    );

  const today = dayjs();

    const nextShift = personSchedule
  .filter((item) =>
    dayjs(item.date, "DD/MM/YYYY")
      .isAfter(dayjs().subtract(1, "day"))
  )
  .sort((a, b) =>
    dayjs(a.date, "DD/MM/YYYY").valueOf() -
    dayjs(b.date, "DD/MM/YYYY").valueOf()
  )[0];  

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "30px",
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        LỊCH TRỰC DQTV
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent:
            "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() =>
            setTab("person")
          }
        >
          Theo người
        </button>

        <button
          onClick={() =>
            setTab("date")
          }
        >
          Theo ngày
        </button>
      </div>

      {tab === "person" && (
        <>
          <div
            style={{
              textAlign:
                "center",
              marginBottom:
                "20px",
            }}
          >
            <select
              value={
                selectedPerson
              }
              onChange={(e) =>
                setSelectedPerson(
                  e.target.value
                )
              }
            >
              {members.map(
                (
                  person
                ) => (
                  <option
                    key={
                      person
                    }
                  >
                    {
                      person
                    }
                  </option>
                )
              )}
            </select>
          </div>

          {nextShift && (
            <div
              style={{
                background:
                  "#16351d",
                border:
                  "1px solid #4caf50",
                borderRadius:
                  "10px",
                padding:
                  "20px",
                marginBottom:
                  "20px",
              }}
            >
              <h3>
                Ca trực tiếp
                theo
              </h3>

              <p>
                <strong>
                  Ngày:
                </strong>{" "}
                {
                  nextShift.date
                }
              </p>

              <p>
                <strong>
                  Ca:
                </strong>{" "}
                {
                  nextShift.shift
                }
              </p>
            </div>
          )}

          <table
            style={{
              width:
                "100%",
              borderCollapse:
                "collapse",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border:
                      "1px solid #555",
                    padding:
                      "10px",
                  }}
                >
                  Ngày
                </th>

                <th
                  style={{
                    border:
                      "1px solid #555",
                    padding:
                      "10px",
                  }}
                >
                  Ca trực
                </th>
              </tr>
            </thead>

            <tbody>
              {personSchedule.map(
                (
                  item,
                  index
                ) => (
                  <tr
                    key={
                      index
                    }
                  >
                    <td
                      style={{
                        border:
                          "1px solid #555",
                        padding:
                          "10px",
                      }}
                    >
                      {
                        item.date
                      }
                    </td>

                    <td
                      style={{
                        border:
                          "1px solid #555",
                        padding:
                          "10px",
                      }}
                    >
                      {
                        item.shift
                      }
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </>
      )}

      {tab === "date" && (
        <>
          <div
            style={{
              textAlign:
                "center",
              marginBottom:
                "20px",
            }}
          >
            <input
              type="date"
              value={
                selectedDate
              }
              onChange={(e) =>
                setSelectedDate(
                  e.target.value
                )
              }
            />
          </div>

          {selectedDay ? (
            <div
              style={{
                border:
                  "1px solid #555",
                borderRadius:
                  "10px",
                padding:
                  "20px",
              }}
            >
              <h2>
                {
                  selectedDay.date
                }
              </h2>

              <p>
                <strong>
                  18h - 22h:
                </strong>{" "}
                {
                  selectedDay.shift1822
                }
              </p>

              <p>
                <strong>
                  22h - 24h:
                </strong>{" "}
                {
                  selectedDay.shift2224
                }
              </p>

              <p>
                <strong>
                  22h - 06h30:
                </strong>{" "}
                {
                  selectedDay.shift220630
                }
              </p>
            </div>
          ) : (
            <div>
              Không có lịch
              trong ngày này
            </div>
          )}
        </>
      )}
    </div>
  );
}