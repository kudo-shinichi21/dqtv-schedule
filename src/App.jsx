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

  const selectedDay = masterSchedule.find(
    (item) => {
      const [day, month, year] =
        item.date.split("/");

      const formattedDate =
        `${year}-${month}-${day}`;

      return formattedDate === selectedDate;
    }
  );

  const today = dayjs();

  const nextShift = personSchedule
  .filter((item) => {
    const [day, month, year] = item.date.split("/");

    const shiftDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return shiftDate >= today;
  })
  .sort((a, b) => {
    const [d1, m1, y1] = a.date.split("/");
    const [d2, m2, y2] = b.date.split("/");

    const date1 = new Date(
      Number(y1),
      Number(m1) - 1,
      Number(d1)
    );

    const date2 = new Date(
      Number(y2),
      Number(m2) - 1,
      Number(d2)
    );

    return date1 - date2;
  })[0];

  
const todayString = dayjs().format("DD/MM/YYYY");

const todaySchedule = masterSchedule.find(
  (item) => item.date === todayString
);

console.log("Today:", dayjs().format());
console.log("Next shift:", nextShift);

  return (
    <div
      style={{
        maxWidth: "1200px",
        position: "relative",
        zIndex: 1,
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
        LỊCH TRỰC DQCD 3 - VHXH
      </h1>
      <p
        style={{
          textAlign: "center",
          color: "#aaa",
          marginBottom: "30px",
        }}
      >
        Quản lý lịch trực nội bộ
      </p>

      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
          background: "#161c2d",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #2b3248",
        }}
      >
        <h3>
          📅 Hôm nay: {todayString}
        </h3>

        {todaySchedule ? (
          <>
            <p>
              🕕 18h - 22h: {todaySchedule.shift1822}
            </p>

            <p>
              📋 22h - 24h: {todaySchedule.shift2224}
            </p>

            <p>
              🌙 22h - 06h30: {todaySchedule.shift220630}
            </p>
          </>
        ) : (
          <p>
            😴 Hôm nay không có lịch trực
          </p>
        )}
      </div>

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
          style={{
            borderRadius: "999px",
            border: "none",
            padding: "12px 20px",
            cursor: "pointer",
            background: "#242b42",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={() =>
            setTab("person")
          }
        >
          Theo người
        </button>

        <button
          style={{
            borderRadius: "8px",
            border: "none",
            padding: "10px 15px",
            cursor: "pointer",
          }}
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
              style={{
                padding: "10px",
                borderRadius: "8px",
                background: "#1e2235",
                color: "white",
              }}
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
                 "linear-gradient(135deg, #114a1f, #1d6e2f)",
                boxShadow:
                  "0 0 30px rgba(0,255,100,0.15)",
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
              <h2
                style={{
                  marginBottom: "15px",
                }}
              >
                📅 Ca trực tiếp theo
              </h2>

              <p style={{ fontSize: "20px" }}>
                📆 {nextShift.date}
              </p>
              <p style={{ fontSize: "20px" }}>
                🕕 {nextShift.shift}
              </p>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gap: "15px",
            }}
          >
            {personSchedule.map((item, index) => (
              <div
                key={index}
                style={{
                  background: "#161c2d",
                  border: "1px solid #2b3248",
                  borderRadius: "12px",
                  padding: "18px",
                  boxShadow:
                    "0 4px 10px rgba(0,0,0,0.2)",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    marginBottom: "10px",
                  }}
                >
                  📅 {item.date}
                </h3>

                <div
                  style={{
                    fontSize: "18px",
                    color: "#ddd",
                  }}
                >
                  {item.shift === "18h - 22h"
                    ? "🕕"
                    : item.shift === "22h - 24h"
                    ? "📋"
                    : "🌙"}{" "}
                  {item.shift}
                </div>
              </div>
            ))}
          </div>
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