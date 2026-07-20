import { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const employees = [
  { name: "Tuấn Khôi", startDate: "2026-07-01" },
  { name: "Đăng Khoa", startDate: "2026-07-05" },
  { name: "Kiến Hoa", startDate: "2026-07-09" },
  { name: "Văn Tài", startDate: "2026-07-13" },
  { name: "Hoàng Sơn", startDate: "2026-07-17" },
  { name: "Tuấn Phát", startDate: "2026-07-21" },
];

function generateSchedule(startDate) {
  const schedules = [];
  let current = dayjs(startDate);

  while (current.year() <= 2027) {
    schedules.push({
      date: current.format("DD/MM/YYYY"),
      shift: "18h - 22h",
    });

    schedules.push({
      date: current.add(12, "day").format("DD/MM/YYYY"),
      shift: "Ngủ chính (22h - 06h30)",
    });

    schedules.push({
      date: current.add(16, "day").format("DD/MM/YYYY"),
      shift: "Hỗ trợ điểm danh (22h - 24h)",
    });

    current = current.add(28, "day");
  }

  return schedules.sort((a, b) => {
    return (
      dayjs(a.date, "DD/MM/YYYY").valueOf() -
      dayjs(b.date, "DD/MM/YYYY").valueOf()
    );
  });
}

function generateAllSchedules() {
  const all = [];

  employees.forEach((employee) => {
    const schedules = generateSchedule(employee.startDate);

    schedules.forEach((schedule) => {
      all.push({
        person: employee.name,
        date: schedule.date,
        shift: schedule.shift,
      });
    });
  });

  return all;
}

export default function App() {
  const [tab, setTab] = useState("person");

  const [selectedName, setSelectedName] = useState(
    employees[0].name
  );

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const user = employees.find(
    (x) => x.name === selectedName
  );

  const schedules = generateSchedule(user.startDate);

  const allSchedules = generateAllSchedules();

  const schedulesByDate = allSchedules.filter((item) => {
    return (
      dayjs(item.date, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      ) === selectedDate
    );
  });

  const today = dayjs().startOf("day");

  const nextShift = schedules
    .filter((item) => {
      const shiftDate = dayjs(
        item.date,
        "DD/MM/YYYY"
      );

      return (
        shiftDate.isSame(today) ||
        shiftDate.isAfter(today)
      );
    })
    .sort((a, b) => {
      return (
        dayjs(
          a.date,
          "DD/MM/YYYY"
        ).valueOf() -
        dayjs(
          b.date,
          "DD/MM/YYYY"
        ).valueOf()
      );
    })[0];

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
          marginBottom: "30px",
        }}
      >
        LỊCH TRỰC DQTV
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={() => setTab("person")}
        >
          👤 Theo người
        </button>

        <button
          onClick={() => setTab("date")}
        >
          📅 Theo ngày
        </button>
      </div>

      {tab === "person" && (
        <>
          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <select
              value={selectedName}
              onChange={(e) =>
                setSelectedName(
                  e.target.value
                )
              }
            >
              {employees.map((person) => (
                <option
                  key={person.name}
                  value={person.name}
                >
                  {person.name}
                </option>
              ))}
            </select>
          </div>

          {nextShift && (
            <div
              style={{
                background: "#15301a",
                border:
                  "1px solid #4caf50",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "25px",
                textAlign: "center",
              }}
            >
              <h3>
                Ca trực tiếp theo
              </h3>

              <p>
                <strong>
                  Ngày:
                </strong>{" "}
                {nextShift.date}
              </p>

              <p>
                <strong>
                  Ca:
                </strong>{" "}
                {nextShift.shift}
              </p>
            </div>
          )}

          <table
            style={{
              width: "100%",
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
                    padding: "12px",
                  }}
                >
                  Ngày
                </th>

                <th
                  style={{
                    border:
                      "1px solid #555",
                    padding: "12px",
                  }}
                >
                  Ca trực
                </th>
              </tr>
            </thead>

            <tbody>
              {schedules.map(
                (
                  item,
                  index
                ) => (
                  <tr
                    key={index}
                  >
                    <td
                      style={{
                        border:
                          "1px solid #555",
                        padding:
                          "12px",
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
                          "12px",
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
              textAlign: "center",
              marginBottom: "25px",
            }}
          >
            <input
              type="date"
              value={selectedDate}
              onChange={(e) =>
                setSelectedDate(
                  e.target.value
                )
              }
            />
          </div>

          <div
            style={{
              display: "grid",
              gap: "15px",
            }}
          >
            {schedulesByDate.length >
            0 ? (
              schedulesByDate.map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={index}
                    style={{
                      border:
                        "1px solid #555",
                      borderRadius:
                        "10px",
                      padding:
                        "15px",
                    }}
                  >
                    <h3>
                      {
                        item.shift
                      }
                    </h3>

                    <p>
                      {
                        item.person
                      }
                    </p>
                  </div>
                )
              )
            ) : (
              <div>
                Không có lịch
                trực ngày này
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}